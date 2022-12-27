import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.sidebar)
  const [isSideBarOpen, setIsSidebarOpen] = useState()
  const [isSideBarFixed, setIsSidebarFixed] = useState(false)
  const [isSideBarItemsCentered, setIsSidebarItemsCentered] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWindowWidth(window.innerWidth)
    })
    if (windowWidth < 1025 && isOpen) {
      setIsSidebarOpen('100vw')
      setIsSidebarFixed('fixed')
      setIsSidebarItemsCentered(true)
    } else if (isOpen && windowWidth > 1025) {
      setIsSidebarOpen('11rem')
      setIsSidebarFixed('block')
      setIsSidebarItemsCentered(false)
    } else {
      setIsSidebarOpen('0px')
    }
  }, [isOpen, windowWidth])

  return (
    <div
      style={{
        width: isSideBarOpen,
        position: isSideBarFixed,
        zIndex: '1',
      }}
      className="sidebar-main-div"
    >
      <nav
        class="navbar bg-body-tertiary align-items-center flex-column"
        style={{
          backgroundColor: '#F4EAD5',
          width: isSideBarOpen,
          height: '100vh',
          transition: 'all 0.1s ease-in-out',
          position: isSideBarFixed,
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
            display: 'flex',
            justifyContent: 'center',
            marginLeft: isSideBarItemsCentered ? '-1rem' : 'none',
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
