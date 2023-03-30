import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import getLocalValue from '../utils/getLocalValue'
import setLocalValue from '../utils/setLocalBalue'
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { unauthorize } from '../redux/slices/user'
import { Mutex } from 'async-mutex'
import { REHYDRATE } from 'redux-persist'
import { showAlert } from '../redux/slices/alert'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_SERVER_ADDRESS,
  prepareHeaders: (headers) => {
    headers.set('authorization', getLocalValue('AccessToken'))
    return headers
  },
})

type ReAuthReturnValue = QueryReturnValue<
  any,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>

const mutex = new Mutex()

const queryWithRefetch: BaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 418) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      const refreshToken = getLocalValue('RefreshToken')

      const { data, error }: ReAuthReturnValue = await baseQuery(
        {
          url: '/auth/reauth',
          body: { refreshToken },
          method: 'POST',
        },
        api,
        extraOptions
      )

      if (error?.status === 400) {
        api.dispatch(unauthorize())
      } else if (error?.status === 500) {
        api.dispatch(showAlert('Помилка серверу'))
      } else if (error?.status === 'FETCH_ERROR') {
        api.dispatch(showAlert("Помилка з'єднання"))
      } else if (data) {
        setLocalValue('AccessToken', data.accessToken)
        setLocalValue('RefreshToken', data.refreshToken)

        result = await baseQuery(
          {
            ...args,
            headers: {
              ...args.headers,
              Authorization: data.accessToken,
            },
          },
          api,
          extraOptions
        )
      }

      release()
    } else {
      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }

  if (result.error?.status === 500) {
    api.dispatch(showAlert('Помилка серверу'))
  } else if (result.error?.status === 'FETCH_ERROR') {
    api.dispatch(showAlert("Помилка з'єднання"))
  }

  return result
}

const apiSlice = createApi({
  baseQuery: queryWithRefetch,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  tagTypes: ['Documents'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload ? action.payload[reducerPath] : undefined
    }
  },
})

export default apiSlice
