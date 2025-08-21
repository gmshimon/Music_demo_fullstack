/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axiosSecure from '../../Utlis/axiosSecure.js'

const initialState = {
  emails: [],

  getEmailLoading: false,
  getEmailSuccess: false,
  getEmailError: false,

  updateEmailLoading: false,
  updateEmailSuccess: false,
  updateEmailError: false
}

export const getAllEmails = createAsyncThunk(
  'email/getAllEmails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.get('/email')
      return response.data.data
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        'Failed to fetch emails'
      return rejectWithValue(msg)
    }
  }
)

export const updateEmail = createAsyncThunk(
  'email/updateEmail',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.put(`/email/${id}`, data)
      return response.data.data
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        'Failed to update email'
      return rejectWithValue(msg)
    }
  }
)

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    reset: state => {
      state.getEmailLoading = false
      state.getEmailSuccess = false
      state.getEmailError = false

      state.updateEmailLoading = false
      state.updateEmailSuccess = false
      state.updateEmailError = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllEmails.pending, state => {
        state.getEmailLoading = true
        state.getEmailSuccess = false
        state.getEmailError = false
      })
      .addCase(getAllEmails.fulfilled, (state, action) => {
        state.getEmailLoading = false
        state.getEmailSuccess = true
        state.getEmailError = false
        state.emails = action.payload
      })
      .addCase(getAllEmails.rejected, state => {
        state.getEmailLoading = false
        state.getEmailSuccess = false
        state.getEmailError = true
      })

      .addCase(updateEmail.pending, state => {
        state.updateEmailLoading = true
        state.updateEmailSuccess = false
        state.updateEmailError = false
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.updateEmailLoading = false
        state.updateEmailSuccess = true
        state.updateEmailError = false

        // Replace updated template in list
        state.emails = state.emails.map(email =>
          email._id === action.payload._id ? action.payload : email
        )
      })
      .addCase(updateEmail.rejected, state => {
        state.updateEmailLoading = false
        state.updateEmailSuccess = false
        state.updateEmailError = true
      })
  }
})

export const { reset } = emailSlice.actions

export default emailSlice.reducer