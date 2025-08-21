/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utlis/axios.js'
import axiosSecure from '../../Utlis/axiosSecure.js'

const initialState = {
  submissions: [],

  getSubmissionLoading: false,
  getSubmissionSuccess: false,
  getSubmissionError: false,

  updateSubmissionLoading: false,
  updateSubmissionSuccess: false,
  updateSubmissionError: false
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

export const updateSubmission = createAsyncThunk(
  'updateSubmission',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(`/submission/update/${id}`, data)
      return response.data.data // assuming backend returns { submission: {...} }
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error.message ||
        'Failed to update submission'
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

      state.updateSubmissionLoading = false
      state.updateSubmissionSuccess = false
      state.updateSubmissionError = false
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
      .addCase(updateSubmission.pending, state => {
        state.updateSubmissionLoading = true
        state.updateSubmissionSuccess = false
        state.updateSubmissionError = false
      })
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.updateSubmissionLoading = false
        state.updateSubmissionSuccess = true
        state.updateSubmissionError = false

        // update that submission in state
        state.submissions = state.submissions.map(sub =>
          sub._id === action.payload._id ? action.payload : sub
        )
      })
      .addCase(updateSubmission.rejected, state => {
        state.updateSubmissionLoading = false
        state.updateSubmissionSuccess = false
        state.updateSubmissionError = true
      })
  }
})

export const { reset } = submissionSlice.actions

export default submissionSlice.reducer
