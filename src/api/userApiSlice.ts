import { PasswordUpdationArgs, SettingsRequestBody, User } from '../../types'
import apiSlice from './apiSlice'

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/user/me',
      }),
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

export const {
  useUpdatePasswordMutation,
  useUpdateSettingsMutation,
  useGetMeQuery,
} = userApiSlice
