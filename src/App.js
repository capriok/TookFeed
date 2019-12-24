import React, { useState, useEffect } from 'react'
import './Main.css'
import { StateProvider } from './state'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/navbar.js'
import Newsfeed from './components/Newsfeed/newsfeed.js'
import Profile from './components/Profile/profile.js'
import FeedOptions from './components/FeedOptions/feedoptions'
import { Transition } from 'react-spring/renderprops'

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
			// case 'reset':
			// 	return {
			// 		...initialState.endpoint
			// 	}
			case 'pass':
				return {
					...state,
					options: action.options
				}
			default:
				return state
		}
	}

	const [feed, setFeed] = useState(
		'https://newsapi.org/v2/top-headlines?country=us&apiKey=569386ab4fcf4954aee7dd0351c13cc0'
	)

	const KEY = '569386ab4fcf4954aee7dd0351c13cc0';

	const [feedOptionsOpen, setFeedOptionsOpen] = useState(true)

	const toggleFeedOptions = () => {
		setFeedOptionsOpen(!feedOptionsOpen)
		if (!feedOptionsOpen) {
			window.scrollTo(0, 0)
		}
	}

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
									<Transition
										items={feedOptionsOpen}
										from={{ position: 'relative', marginTop: -500 }}
										enter={{ position: 'relative', marginTop: 0, opacity: 1 }}
										leave={{ position: 'relative', marginTop: -500, }}
										config={{ duration: 200 }}>
										{feedOptionsOpen => feedOptionsOpen && (props => <div style={props}>
											<FeedOptions setFeed={setFeed} />
										</div>
										)}
									</Transition>
									<Newsfeed feed={feed} open={feedOptionsOpen} />
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
