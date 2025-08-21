import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slice/AuthSlice'
import trackSlice from './Slice/TrackSlice'
import submissionSlice from './Slice/SubmissionSlice'
import emailSlice from './Slice/EmailSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    track: trackSlice,
    submission: submissionSlice,
    email:emailSlice
  }
})
