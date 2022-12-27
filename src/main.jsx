import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NotFoundPage from './components/NotFoundPage'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from './store'
import {
  Profile,
  Stats,
  AllBills,
  AddBill,
  SharedLayout,
} from './components/dashboard'
import ProtectedRouter from './components/dashboard/ProtectRouter'

const router = createBrowserRouter([
  {
    path: '/stats',
    element: (
      <ProtectedRouter>
        <SharedLayout>
          <Stats />
        </SharedLayout>
      </ProtectedRouter>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRouter>
        <SharedLayout>
          <Profile />
        </SharedLayout>
      </ProtectedRouter>
    ),
  },
  {
    path: '/allbills',
    element: (
      <ProtectedRouter>
        <SharedLayout>
          <AllBills />
        </SharedLayout>
      </ProtectedRouter>
    ),
  },
  {
    path: '/addbill',
    element: (
      <ProtectedRouter>
        <SharedLayout>
          <AddBill />
        </SharedLayout>
      </ProtectedRouter>
    ),
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
)
