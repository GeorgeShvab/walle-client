import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import apiSlice from '../api/apiSlice'
import user from './slices/user'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import settings from './slices/settings'
import alert from './slices/alert'
import tabs from './slices/tabs'

export const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['alert'],
  throttle: 50,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user,
    settings,
    alert,
    tabs,
    [apiSlice.reducerPath]: apiSlice.reducer,
  })
)

export const removePersistStore = persistConfig.storage.removeItem

function rootReducer(state: any, action: AnyAction) {
  if (action.type === 'RESET') {
    state = undefined
  }
  return persistedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
