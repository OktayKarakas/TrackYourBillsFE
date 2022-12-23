import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <img src="/assets/404-img.svg" />
      <br />
      <Link to="/">Go Back Home</Link>
    </div>
  )
}

export default NotFoundPage
