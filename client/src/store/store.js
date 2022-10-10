import { configureStore } from '@reduxjs/toolkit'
import { authSlice, postSlice } from './'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer
  },
})