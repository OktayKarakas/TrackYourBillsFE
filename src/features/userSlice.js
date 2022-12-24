import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios'

const initialState = {
  isLoading: false,
  user: null,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/api/v1/auth/register', user)
      return resp.data
    } catch (error) {
      console.log(error)
      toast.error('Error. Please try again later.')
    }
  },
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/api/v1/auth/login', user)
      return resp.data
    } catch (error) {
      console.log(error)
      toast.error('Error. Please try again later.')
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true
      console.log('pending...')
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { payload } = action
      state.isLoading = false
      state.user = payload.user
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
      toast('Welcome' + ' ' + payload.user.name)
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      toast.error('Error. Please try again later.')
    })
  },
})

export default userSlice.reducer
