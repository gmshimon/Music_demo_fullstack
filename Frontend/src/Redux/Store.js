import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slice/AuthSlice'
import trackSlice from './Slice/TrackSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    track: trackSlice
  }
})
