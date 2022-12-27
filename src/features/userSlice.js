import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios'
import {
  addUserToLocalStorage,
  deleteUserFromLocalStorage,
  getUserFromLocalStorage,
  updateUserFormLocalStorage,
} from '../utils/localStorage'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    const resp = await customFetch.post('/api/v1/auth/register', user)
    return resp.data
  },
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    const resp = await customFetch.post('/api/v1/auth/login', user)
    return resp.data
  },
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    const resp = await customFetch.patch('/api/v1/auth/updateUser', user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return resp.data.data
  },
)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.user = null
      deleteUserFromLocalStorage()
      toast('You have been logged out.')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true
      console.log('pending...')
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { payload } = action
      state.isLoading = false
      state.user = payload.user
      addUserToLocalStorage(payload.user)
      toast('Welcome' + ' ' + payload.user.name)
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      toast.error('Error. Please try again later.')
    })
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { payload } = action
      state.isLoading = false
      state.user = payload.user
      addUserToLocalStorage(payload.user)
      toast('Welcome' + ' ' + payload.user.name)
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      toast.error('Error. Please try again later.')
    })
    builder.addCase(updateUser.pending, (state, action) => {
      toast('Pending..')
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { payload } = action
      const token = state.user.token
      state.user = payload
      state.user.token = token
      payload.token = token
      updateUserFormLocalStorage(payload)
      toast('User updated successfully.')
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.error.code === 'ERR_BAD_REQUEST') {
        toast.error('Please login again.')
        state.user = null
        deleteUserFromLocalStorage()
      } else {
        toast.error('Error. Please try again later.')
      }
    })
  },
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
