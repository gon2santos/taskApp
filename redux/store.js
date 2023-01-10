import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './slice'

export const store = configureStore({
  reducer: {
    project: projectReducer
  },
})