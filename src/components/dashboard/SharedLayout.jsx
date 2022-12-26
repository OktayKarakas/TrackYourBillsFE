import React from 'react'
import Navbar from './dashboard_components/Navbar'
import Sidebar from './dashboard_components/Sidebar'

const SharedLayout = (props) => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {props.children}
      </div>
    </div>
  )
}

export default SharedLayout
