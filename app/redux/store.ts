import {
  Middleware,
  MiddlewareAPI,
  applyMiddleware,
  configureStore,
} from "@reduxjs/toolkit"
import loadingReducer from "../redux/features/loadingSlice"
import snackBarReducer from "../redux/features/snackbarSlice"
import { stockApi } from "./services/stockApi"

import { setupListeners } from "@reduxjs/toolkit/query"

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch } = api

    return next(action)
  }

const middlewareEnhancer = applyMiddleware(rtkQueryErrorLogger)

export const store = configureStore({
  reducer: {
    loadingReducer,
    snackBarReducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stockApi.middleware),
  enhancers: [middlewareEnhancer],
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
