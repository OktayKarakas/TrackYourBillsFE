import React from 'react'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="landing-page-content-text">
          <h3>
            Track Your <span>Bill</span> App
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis
            sagittis est, at pellentesque metus. Sed eu ex sit amet sem auctor
            sollicitudin in quis urna. Curabitur eget bibendum felis. Maecenas
            nunc massa, fermentum a metus at, dignissim cursus sapien. Nullam
            viverra finibus iaculis. Aenean blandit rhoncus metus semper
            malesuada. Proin gravida dui id eleifend congue. Nulla in tincidunt
            quam.
          </p>
          <button>Login/Register</button>
        </div>
        <div className="landing-page-content-img">
          <img src="/assets/landingPageImage.svg" />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
