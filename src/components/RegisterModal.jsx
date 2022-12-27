import React, { useState, useEffect } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Modal, Input, Space, Button } from 'antd'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}

const RegisterModal = ({ onClose, isOpened, isWantLogin }) => {
  const navigate = useNavigate()
  const { isLoading, user } = useSelector((state) => state.user)
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

  const onSubmit = (e) => {
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      toast('Please fill all the fields')
    }

    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (user) {
      onClose()
      navigate('/stats')
    }
  }, [user])
  return (
    <>
      <Modal
        title="Register"
        centered
        onOk={onClose}
        okText="Register"
        open={isOpened}
        onCancel={onClose}
        width={500}
        className="register-modal"
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={[
          <Button key="submit" type="primary" onClick={() => onSubmit()}>
            {isLoading ? 'Loading...' : 'Register'}
          </Button>,
          <Button key="back" onClick={() => isWantLogin()}>
            Already Have an Account?
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Enter name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
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

export default RegisterModal
