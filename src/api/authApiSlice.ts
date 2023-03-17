import { AuthResponse, LoginArgs, RegistrationArgs, User } from '../../types'
import apiSlice from './apiSlice'

const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    googleAuth: builder.mutation<AuthResponse, string>({
      query: (token) => ({
        url: import.meta.env.VITE_APP_SERVER_ADDRESS + '/auth/google',
        method: 'POST',
        body: { clientToken: token },
      }),
    }),
    registration: builder.mutation<AuthResponse, RegistrationArgs>({
      query: (body) => ({
        url: import.meta.env.VITE_APP_SERVER_ADDRESS + '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginArgs>({
      query: (body) => ({
        url: import.meta.env.VITE_APP_SERVER_ADDRESS + '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGoogleAuthMutation,
  useRegistrationMutation,
  useLoginMutation,
} = authApiSlice
