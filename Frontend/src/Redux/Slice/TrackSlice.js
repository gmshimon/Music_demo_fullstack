/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utlis/axios.js'
import axiosSecure from '../../Utlis/axiosSecure.js'

const initialState = {
  tracks: [],

  createTrackLoading: false,
  createTrackSuccess: false,
  createTrackError: false
}

export const createTrack = createAsyncThunk(
  'createTrack',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.post('/tracks/create-track', data)
      return response.data.data
    } catch (error) {
      const msg =
        error?.response?.data?.error || error.message || 'Failed to load track'
      return rejectWithValue(msg)
    }
  }
)

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    reset: state => {
      state.createTrackLoading = false
      state.createTrackSuccess = false
      state.createTrackError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createTrack.pending, state => {
        state.createTrackLoading = true
        state.createTrackSuccess = false
        state.createTrackError = false
      })
      .addCase(createTrack.fulfilled, (state, action) => {
        state.createTrackLoading = false
        state.createTrackSuccess = true
        state.createTrackError = false
        state.tracks.push(action.payload)
      })
      .addCase(createTrack.rejected, state => {
        state.createTrackLoading = false
        state.createTrackSuccess = false
        state.createTrackError = true
      })
  }
})

export const { reset } = trackSlice.actions

export default trackSlice.reducer
