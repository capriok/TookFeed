import React from 'react'
import './App.css'
import Navbar from './components/Navbar/navbar.js'
import Newsfeed from './components/Newsfeed/newsfeed.js'
import { StateProvider } from './state'

function App() {
	const initialState = {
		auth: {
			isAuthenticated: false,
			token: '',
			user: {}
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
					...initialState
				}

			default:
				return state
		}
	}

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<Navbar />
			<Newsfeed />
		</StateProvider>
	)
}

export default App
