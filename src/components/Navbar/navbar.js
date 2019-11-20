import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import './navbar.css'
import Logo from './img/logo.png'
import AccModal from '../AccModal/accmodal.js'

function Navbar() {
	const [accModalOpen, setAccModalOpen] = useState(false)
	const [{ auth }, dispatch] = useStateValue()

	const toggleAccModal = () => setAccModalOpen(!accModalOpen)

	const Clickout = () => (
		<div onClick={toggleAccModal} className='clickout'></div>
	)

	const LoginRegsterButton = props => (
		<button onClick={props.click} className='navbtn'>
			Login | Register
		</button>
	)

	const LogoutButton = props => (
		<>
			<button className='navbtn' onClick={props.click}>
				Logout
			</button>
		</>
	)

	const logoutUser = () => {
		localStorage.clear()
		dispatch({
			type: 'logout'
		})
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		const user = localStorage.getItem('user')
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
			{accModalOpen && <AccModal toggle={toggleAccModal} />}
			<header>
				<nav>
					<div className='navlogo'>
						<a href="/"><img className='logo' src={Logo} alt='img' /></a>
					</div>
					<div>
						{auth.isAuthenticated ? (
							<LogoutButton click={logoutUser} />
						) : (
								<LoginRegsterButton click={toggleAccModal} />
							)}
					</div>
				</nav>
			</header>
		</>
	)
}

export default Navbar
