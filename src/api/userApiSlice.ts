import { PasswordUpdationArgs, SettingsRequestBody, User } from '../../types'
import getLocalValue from '../utils/getLocalValue'
import apiSlice from './apiSlice'

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void | string>({
      query: () => ({
        url: '/user/me',
        headers: {
          authorization: getLocalValue('AccessToken'),
        },
      }),
      providesTags: ['User'],
    }),
    updatePassword: builder.mutation<void, PasswordUpdationArgs>({
      query: (body) => ({
        url: '/user/password',
        method: 'PATCH',
        body,
      }),
    }),
    updateSettings: builder.mutation<void, SettingsRequestBody>({
      query: (body) => ({
        url: '/user/settings',
        method: 'PATCH',
        body,
      }),
    }),
  }),
})

export default userApiSlice

export const {
  useUpdatePasswordMutation,
  useUpdateSettingsMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = userApiSlice
