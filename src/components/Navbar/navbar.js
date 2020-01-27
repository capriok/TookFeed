import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import Logo from '../img/logo.png'
import Feeds from '../img/navfeeds.png'
import Profile from '../img/navprofile.png'
import Logout from '../img/navlogout.png'
import AccModal from '../AccModal/accmodal.js'
import '../stylesheets/navbar.css'

function Navbar({ toggleFO }) {
  const [accModalOpen, setAccModalOpen] = useState(false)
  const [{ auth }, dispatch] = useStateValue()

  const toggleAccModal = () => setAccModalOpen(!accModalOpen)

  const Clickout = () => (
    <div onClick={toggleAccModal} className='clickout'></div>
  )

  const LoginRegsterButton = props => (
    <button className='accountbtn' onClick={toggleAccModal}>
      Login | Register
    </button>
  )

  const FeedOptionsButton = () => (
    <img className='navicon' onClick={toggleFO} src={Feeds} alt=''></img>
  )

  const ProfileButton = () => (
    <a href='/profile'>
      <img className='navicon' src={Profile} alt=''></img>
    </a>
  )

  const LogoutButton = () => (
    <img className='navicon' onClick={logoutUser} src={Logout} alt=''></img>
  )

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
    dispatch({
      type: 'logout'
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('TF-token')
    const user = localStorage.getItem('TF-user')
    if (token !== null) {
      dispatch({
        type: 'login',
        auth: {
          isAuthenticated: true,
          token: token,
          user: JSON.parse(user)
        }
      })
    }
  }, [dispatch])

  return (
    <>
      {accModalOpen && <Clickout onClick={toggleAccModal} />}
      {accModalOpen && <AccModal toggleAccModal={toggleAccModal} />}
      <header>
        <nav>
          <div className='navlogo'>
            <a href='/'>
              <img className='logo' src={Logo} alt='img' />
            </a>
          </div>
          <div>
            {auth.isAuthenticated ? (
              <>
                <FeedOptionsButton />
                <ProfileButton />
                <LogoutButton />
              </>
            ) : (
              <LoginRegsterButton />
            )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
