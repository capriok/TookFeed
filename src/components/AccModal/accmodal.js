import React, { useState, useEffect } from 'react'
import './accmodal.css'
import { useStateValue } from '../../state'
import axios from 'axios'

function AccModal({ toggleAccModal }) {
	let modaltitle = document.querySelector('.modaltext')
	let reqsUL = document.querySelector('.reqsUL')
	let reqsUV = document.querySelector('.reqsUV')
	let reqsPL = document.querySelector('.reqsPL')
	let reqsPV = document.querySelector('.reqsPV')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [{ auth }, dispatch] = useStateValue()
	const [registerOpen, setregisterOpen] = useState(false)

	const toggleRegister = () => {
		setregisterOpen(!registerOpen)
		setUsername('')
		setPassword('')
	}

	const validate = () => {
		let hasError = false
		let oneUppercase = /(?=.*[A-Z])/
		let notLetters = /[^a-zA-Z]+/g

		if (username.length <= 2) {
			reqsUL.style.color = 'red'
			hasError = true
		} else {
			reqsUL.style.color = 'green'
		}
		if (notLetters.test(username) === true) {
			reqsUV.style.color = 'red'
			hasError = true
		} else {
			reqsUV.style.color = 'green'
		}

		if (password.length <= 4) {
			reqsPL.style.color = 'red'
			hasError = true
		} else {
			reqsPL.style.color = 'green'
		}
		if (oneUppercase.test(password) === false) {
			reqsPV.style.color = 'red'
			hasError = true
		} else {
			reqsPV.style.color = 'green'
		}

		return hasError
	}


	async function handleLogin(e) {
		e.preventDefault()
		if (username && password) {
			let today = new Date().toLocaleString()
			axios
				.post('http://localhost:5000/users/login', { username: username, password: password })
				.then(res => {
					localStorage.setItem('TF-token', res.data.token)
					localStorage.setItem('TF-user', JSON.stringify(res.data.user))
					dispatch({
						type: 'login',
						auth: {
							isAuthenticated: true,
							token: res.data.token,
							user: res.data.user
						}
					})
					localStorage.setItem('TF-lastLogin', today)
					toggleAccModal()
				})
				.catch((error) => {
					console.log(error)
					modaltitle.innerHTML = 'Invalid username or password'
				})
		}
	}

	async function handleRegister(e) {
		e.preventDefault()
		if (username && password) {
			const err = validate()
			if (username && !err) {
				await axios
					.post('http://localhost:5000/users/register', {
						username: username,
						password: password
					})
					.then((res) => {
						console.log(res.data)
						modaltitle.innerHTML = 'Account created, you may login'
						toggleRegister()
						setUsername('')
						setPassword('')
					})
					.catch(error => {
						console.error(error)
					})
				console.log('OK');

			} else { console.log('Errors found'); }
		}
	}
	useEffect(() => {
		console.log('Auth Status', auth.isAuthenticated);
	}, [auth])

	return (
		<>
			<div className={!registerOpen ? 'logcontent' : 'logcontent reg'}>
				<div className="logforms">
					<div className={!registerOpen ? 'logset' : 'logunset'}>
						<div>{<h4 className='modaltext'>
							Enter a username or password to login.
						</h4>}</div>
						<form onSubmit={handleLogin}>
							<div className="inputs">
								<input
									onChange={e => setUsername(e.target.value.trim())}
									value={username}
									type='text'
									autoComplete='off'
									className='username'
									placeholder='Username'
								/>
								<input
									onChange={e => setPassword(e.target.value.trim())}
									value={password}
									type='password'
									autoComplete='off'
									className='password'
									placeholder='Password'
								/>
							</div>
							<button type='submit' className='submit'>
								Login
						</button>
						</form>
						<button className='accmodalbtn' onClick={toggleRegister}>
							<h5 className='modaltext'>
								Click here to create a new account.
						</h5>
						</button>
					</div>
				</div>

				<div className="regforms">
					<div className={registerOpen ? 'regset' : 'regunset'}>
						<div>{<h4 className='modaltext'>
							Meet all requirements to register.
						</h4>}</div>
						<form onSubmit={handleRegister}>
							<div className="inputs">
								<input
									onChange={e => setUsername(e.target.value.trim())}
									value={username}
									type='text'
									autoComplete='off'
									className='username'
									placeholder='Username'
								/>
								<input
									onChange={e => setPassword(e.target.value.trim())}
									value={password}
									type='password'
									autoComplete='off'
									className='password'
									placeholder='Password'
								/>
							</div>
							<button type='submit' className='submit'>
								Register
						</button>
						</form>
						<div className="reqs">
							<div className="namereqs">
								<span>Username Requirements</span>
								<li className='reqsUL'>Must be 3 characters long</li>
								<li className='reqsUV'>Only Alphabetical Values</li>
							</div>
							<div className="passreqs">
								<span>Password Requirements</span>
								<li className='reqsPL'>Must be 5 characters long</li>
								<li className='reqsPV'>At least one uppercase letter</li>
							</div>
						</div>
						<br></br>
						<button className='accmodalbtn' onClick={toggleRegister}>
							<h5 className='modaltext'>
								Click here to login.
						</h5>
						</button>
					</div>
				</div>

			</div>
		</>
	)
}

export default AccModal
