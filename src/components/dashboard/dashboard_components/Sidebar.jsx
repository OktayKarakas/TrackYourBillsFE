import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.sidebar)
  const [isSideBarOpen, setIsSidebarOpen] = useState()
  useEffect(() => {
    if (isOpen) {
      setIsSidebarOpen('11rem')
    } else {
      setIsSidebarOpen('0px')
    }
  }, [isOpen])
  return (
    <div style={{ width: isSideBarOpen }}>
      <nav
        class="navbar bg-body-tertiary align-items-center flex-column"
        style={{
          backgroundColor: '#F4EAD5',
          width: isOpen ? '11rem' : '0px',
          height: '100vh',
          transition: 'all 0.1s ease-in-out',
        }}
      >
        <div
          class="container-fluid sidebar-container"
          style={{
            color: '#424d58',
            opacity: isOpen ? '1' : '0',
            transition: 'all 0.1s ease-in-out',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            width: isOpen ? '100%' : 'none',
          }}
        >
          <ul className="sidebar-ul" style={{ color: '#424d58' }}>
            <li>
              <Link to="/stats">
                <i class="fa-solid fa-chart-pie"></i> Stats
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <i class="fa-solid fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <Link to="/allbills">
                <i class="fa-solid fa-money-bill"></i> All Bills
              </Link>
            </li>
            <li>
              <Link to="/addbill">
                <i class="fa-solid fa-hand-holding-dollar"></i> Add Bill
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
