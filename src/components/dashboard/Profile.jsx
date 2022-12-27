import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const initialState = {
    email: user.email,
    name: user.name,
    currency: user.currency,
  }
  const [profile, setProfile] = useState(initialState)
  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }
  const handleSubmit = (e) => {
    if (profile.name === user.name && profile.currency === user.currency) {
      toast.error('No changes made')
      return
    }
    if (profile.name === '' || profile.currency === '') {
      toast.error('Please fill all the fields')
      return
    }
    dispatch(updateUser(profile))
  }
  return (
    <div className="profile-component-container">
      <div className="profile-form-div">
        <div className="profile-form-div-heading">
          <h1>Profile</h1>
          <div>
            <button
              className="profile-form-div-heading-button-submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className="profile-form-div-heading-button-reset"
              onClick={() => setProfile(initialState)}
            >
              Reset
            </button>
          </div>
        </div>
        <hr />
        <div className="profile-form">
          <div>
            <span>E-mail</span>
            <input disabled value={profile.email} name="email" />
          </div>
          <div>
            <span>Name</span>
            <input value={profile.name} name="name" onChange={handleChange} />
          </div>
          <div>
            <span>Currency</span>
            <input
              value={profile.currency}
              name="currency"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
