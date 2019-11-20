import React, { useState } from 'react'
import './accmodal.css'
// import Login from './login.js'
// import Register from './register.js'
import { useStateValue } from '../../state'
import axios from 'axios'

function AccModal({ toggle }) {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [auth, dispatch] = useStateValue()
	const [registerOpen, setregisterOpen] = useState(false)
	const toggleRegister = () => setregisterOpen(!registerOpen)

	async function handleLogin(e) {
		e.preventDefault()
		axios
			.post('http://localhost:5000/users/login', { username: username, password: password })
			.then(res => {
				localStorage.setItem('token', res.data.token)
				localStorage.setItem('user', JSON.stringify(res.data.user))
				dispatch({
					type: 'login',
					auth: {
						isAuthenticated: true,
						token: res.data.token,
						user: res.data.user
					}
				})
				toggle()
			})
			.catch((error) => {
				console.log(error)
				setStatus('Invalid username or password')
			})
	}

	const [status, setStatus] = useState(
		'Enter a username and passord to login.'
	)

	async function handleRegister(e) {
		e.preventDefault()
		await axios
			.post('http://localhost:5000/users/add', {
				username: username,
				password: password
			})
			.then((res) => {
				console.log(res.data)
				toggleRegister()
				setStatus('Account created, you may login')
				setUsername('')
				setPassword('')

			})
			.catch(error => console.error(error))
	}

	return (
		<>
			<div className='logcontent'>
				<div>
					<div>{<h3 className='modaltext'>
						{registerOpen ? 'Enter a username and password to register.' : status}
					</h3>}</div>
					<form onSubmit={!registerOpen ? handleLogin : handleRegister}>
						<input
							onChange={e => setUsername(e.target.value)}
							value={username}
							type='text'
							autoComplete='off'
							className='username'
							placeholder='Username'
						/>
						<input
							onChange={e => setPassword(e.target.value)}
							value={password}
							type='password'
							autoComplete='off'
							className='password'
							placeholder='Password'
						/>
						<br></br>
						<button type='submit' className='submit'>
							{!registerOpen ? 'Login' : 'Register'}
						</button>
					</form>
				</div>
				<button className='accmodalbtn' onClick={toggleRegister}>
					<h5 className='modaltext'>
						{!registerOpen ? 'Click here to create a new account.' : 'Click here to login.'}
					</h5>
				</button>
			</div>
		</>
	)
}

export default AccModal
