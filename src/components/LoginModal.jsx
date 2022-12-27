import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Modal, Input, Space, Button } from 'antd'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/userSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const LoginModal = ({ onClose, isOpened, isWantRegister }) => {
  const navigate = useNavigate()
  const { isLoading, user } = useSelector((state) => state.user)
  const [confirmLoading, setConfirmLoading] = useState(isLoading)
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setValues((prevEl) => {
      return {
        ...prevEl,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    if (user) {
      onClose()
      navigate('/stats')
    }
  }, [user])

  useEffect(() => {
    setConfirmLoading(isLoading)
  }, [isLoading])

  const onSubmit = (e) => {
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast('Please fill all the fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email, password }))
      return
    }
  }
  return (
    <>
      <Modal
        title="Login"
        centered
        onOk={onClose}
        okText="Register"
        open={isOpened}
        onCancel={onClose}
        width={500}
        className="register-modal"
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={[
          <Button key="submit" type="primary" onClick={onSubmit}>
            {confirmLoading ? 'Loading...' : 'Login'}
          </Button>,
          <Button key="back" onClick={isWantRegister}>
            Don't have an account?
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Enter email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input.Password
            placeholder="Create Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </Space>
      </Modal>
    </>
  )
}

export default LoginModal
