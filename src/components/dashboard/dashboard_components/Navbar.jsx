import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSideBar } from '../../../features/sideBarSlice'
import { logoutUser } from '../../../features/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { isOpen } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch()
  const currentPage = location.pathname.split('/')[1]
  return (
    <div>
      <nav
        class="navbar bg-body-tertiary d-flex justify-content-between align-items-center py-3 px-3"
        style={{ backgroundColor: '#F4EAD5' }}
      >
        <div class="container-fluid" style={{ color: '#424d58' }}>
          <span
            class="navbar-brand mb-0 h1"
            style={{ color: '#424d58', cursor: 'pointer' }}
            onClick={() => dispatch(toggleSideBar())}
          >
            {isOpen ? (
              <i class="fa-solid fa-xmark"></i>
            ) : (
              <i class="fa-solid fa-bars"></i>
            )}
          </span>
          <span
            className="h4 mb-0"
            style={{ borderBottom: '2px solid #424d58' }}
          >
            {currentPage.toUpperCase()}
          </span>
          <div class="dropdown">
            <a
              class="btn dropdown-toggle btn-outline-dark"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user?.name}
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    dispatch(logoutUser())
                    navigate('/')
                  }}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

{
  /* <h2 className="navbar-brand">Track Your Bills</h2>
      <p>
        <i class="fa-solid fa-bars"></i>
      </p>
      <h1>{currentPage.toUpperCase()}</h1> */
}
