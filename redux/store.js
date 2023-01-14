import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './slice'
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

