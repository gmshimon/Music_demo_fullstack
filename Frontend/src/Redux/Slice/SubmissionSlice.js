/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utlis/axios.js'
import axiosSecure from '../../Utlis/axiosSecure.js'

const initialState = {
  submissions: [],

  getSubmissionLoading: false,
  getSubmissionSuccess: false,
  getSubmissionError: false
}

export const getMySubmissions = createAsyncThunk(
  'getMySubmissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/submission/my-submission')
      return response.data.data
    } catch (error) {
      const msg =
        error?.response?.data?.error || error.message || 'Failed to load track'
      return rejectWithValue(msg)
    }
  }
)
export const getAllSubmissions = createAsyncThunk(
  'getAllSubmissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/submission/all-submission')
      return response.data.data
    } catch (error) {
      const msg =
        error?.response?.data?.error || error.message || 'Failed to load track'
      return rejectWithValue(msg)
    }
  }
)

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    reset: state => {
      state.getSubmissionLoading = false
      state.getSubmissionSuccess = false
      state.getSubmissionError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMySubmissions.pending, state => {
        state.getSubmissionLoading = true
        state.getSubmissionSuccess = false
        state.getSubmissionError = false
      })
      .addCase(getMySubmissions.fulfilled, (state, action) => {
        state.getSubmissionLoading = false
        state.getSubmissionSuccess = true
        state.getSubmissionError = false
        state.submissions = action.payload
      })
      .addCase(getMySubmissions.rejected, state => {
        state.getSubmissionLoading = false
        state.getSubmissionSuccess = false
        state.getSubmissionError = true
      })
      .addCase(getAllSubmissions.pending, state => {
        state.getSubmissionLoading = true
        state.getSubmissionSuccess = false
        state.getSubmissionError = false
      })
      .addCase(getAllSubmissions.fulfilled, (state, action) => {
        state.getSubmissionLoading = false
        state.getSubmissionSuccess = true
        state.getSubmissionError = false
        state.submissions = action.payload
      })
      .addCase(getAllSubmissions.rejected, state => {
        state.getSubmissionLoading = false
        state.getSubmissionSuccess = false
        state.getSubmissionError = true
      })
  }
})

export const { reset } = submissionSlice.actions

export default submissionSlice.reducer
