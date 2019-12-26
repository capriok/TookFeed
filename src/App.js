import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StateProvider } from './state'
import Navbar from './components/Navbar/navbar.js'
import Newsfeed from './components/Newsfeed/newsfeed.js'
import Profile from './components/Profile/profile.js'
import './Main.css'

export default function App() {
	const initialState = {
		auth: {
			isAuthenticated: false,
			token: '',
			user: {}
		},
		endpoint: {
			everything: false,
			headlines: false,
			sources: false
		},
		options: {
			q: '',
			sources: '',
			category: '',
			country: '',
			to: '',
			from: '',
			language: '',
		}
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case 'login':
				return {
					...state,
					auth: action.auth
				}
			case 'logout':
				return {
					...initialState.auth
				}
			case 'filter':
				return {
					...state,
					endpoint: action.endpoint
				}
			case 'pass':
				return {
					...state,
					options: action.options
				}
			default:
				return state
		}
	}

	const [feedOptionsOpen, setFeedOptionsOpen] = useState(false)

	const toggleFeedOptions = () => {
		setFeedOptionsOpen(!feedOptionsOpen)
		if (!feedOptionsOpen) {
			window.scrollTo(0, 0)
		}
	}

	useEffect(() => {
		let authorize = localStorage.getItem('token')
		if (authorize) {
			initialState.auth.isAuthenticated = true
		}
		console.log('Auth Status', initialState.auth.isAuthenticated);
		console.log('Welcome to TookFeed')
	}, [initialState.auth.isAuthenticated])

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<Navbar toggleFO={toggleFeedOptions} />
			<div className='container'>
				<Router>
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<>
									<Newsfeed feedOptionsOpen={feedOptionsOpen} />
								</>
							)}
						/>
						<Route path='/profile' component={Profile} />
					</Switch>
				</Router>
			</div>
		</StateProvider>
	)
}
