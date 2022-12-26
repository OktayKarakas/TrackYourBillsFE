import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import sideBarReducer from './features/sideBarSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    sidebar: sideBarReducer,
  },
})

export default configureStore({ reducer: { user: userReducer } })
