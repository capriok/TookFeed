import React from 'react'
import './App.css'
import Navbar from './components/Navbar/navbar.js'
import Newsfeed from './components/Newsfeed/newsfeed.js'
import Profile from './components/Profile/profile.js'
import { StateProvider } from './state'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


export default function App() {
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

			<div className="container">
				<Router>
					<Switch>
						<Route exact path="/" component={Newsfeed} />
						<Route path="/profile" component={Profile} />
					</Switch>
				</Router>
			</div>
		</StateProvider>
	)
}
