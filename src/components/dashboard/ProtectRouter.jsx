import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
const ProtectRouter = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  if (!user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectRouter
