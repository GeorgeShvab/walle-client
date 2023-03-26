import {
  AuthResponse,
  LoginArgs,
  PasswordUpdationArgs,
  RegistrationArgs,
  User,
} from '../../types'
import getLocalValue from '../utils/getLocalValue'
import apiSlice from './apiSlice'

const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    googleAuth: builder.mutation<AuthResponse, string>({
      query: (token) => ({
        url: '/auth/google',
        method: 'POST',
        body: { clientToken: token },
      }),
    }),
    registration: builder.mutation<void, RegistrationArgs>({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginArgs>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    verify: builder.mutation<AuthResponse, string>({
      query: (token) => ({
        url: '/auth/verify',
        method: 'POST',
        body: { verificationToken: token },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return {
          url: '/auth/logout',
          method: 'POST',
          body: { refreshToken: getLocalValue('RefreshToken') },
        }
      },
    }),
  }),
})

export const {
  useGoogleAuthMutation,
  useRegistrationMutation,
  useLoginMutation,
  useVerifyMutation,
  useLogoutMutation,
} = authApiSlice
