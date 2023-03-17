import { configureStore } from '@reduxjs/toolkit'
import mode from './slices/mode'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import apiSlice from '../api/apiSlice'
import user from './slices/user'

const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer, mode, user },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
