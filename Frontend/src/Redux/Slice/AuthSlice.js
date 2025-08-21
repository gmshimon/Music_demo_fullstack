/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../Utlis/axios.js'
import axiosSecure from '../../Utlis/axiosSecure.js'
import auth from '../../Firebase/firebase.config.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
const initialState = {
  user: null,
  isLoading: false,
  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginError: false,
  isCreateUserLoading: false,
  isCreateUserSuccess: false,
  isCreateUserError: false,
  isGetUserDataLoading: true,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,

}

export const saveUserData = async userData => {
  const response = await axios.post('user/', userData)

  const data = response.data.data
  const tokenExpiration = new Date().getTime() + 3 * 60 * 60 * 1000 // 8 hours from now
  localStorage.setItem(
    'userToken',
    JSON.stringify({
      access_token: response.data.token,
      expiration: tokenExpiration
    })
  )
  return data
}

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const data = await saveUserData({
      name: res?.user?.displayName,
      email: email
    })
    return data
  }
)

export const createUser = createAsyncThunk(
  'createUser',
  async (formdata) => {
    const email = formdata.get("email")
    const password = formdata.get("password")
    const name = formdata.get("name")
    const userData ={
      name,email,password
    }
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const result = updateProfile(auth.currentUser, {
      displayName: name
    })
    const data = await saveUserData(userData)
    return data
  }
)

export const fetchUser = createAsyncThunk('fetchUser', async email => {
  const response = await axios.post(`/user/get-user`, { email: email })
  return response.data.data
})

export const logOut = createAsyncThunk('logOut', async () => {
  const response = await signOut(auth)
  localStorage.removeItem('userToken')
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.isLoginLoading = false
      state.isLoginError = false
      state.isLoginSuccess = false
      state.isCreateUserLoading = false
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
      state.isGetUserDataLoading = false
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false

    },
    startLoading: (state, action) => {
      state.isGetUserDataLoading = false
      state.isLoading = action.payload
    },
    setUser: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    logout: async (state, action) => {
      signOut(auth).then(() => {
        state.user = null
        localStorage.removeItem('userToken')
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginSuccess = false
        state.isLoginError = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.isGetUserDataLoading = true
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = true
        state.isGetUserDataError = false
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isGetUserDataLoading = false
        state.isGetUserDataSuccess = false
        state.isGetUserDataError = true
      })
      .addCase(createUser.pending, (state, action) => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.isCreateUserLoading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null
      })
      .addCase(logOut.rejected, (state, action) => {})
  }
})

export const { reset, setUser, logout, startLoading } = userSlice.actions
export default userSlice.reducer