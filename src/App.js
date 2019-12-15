import React, { useState } from 'react'
import './Main.css'
import { StateProvider } from './state'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/navbar.js'
import Newsfeed from './components/Newsfeed/newsfeed.js'
import Profile from './components/Profile/profile.js'
import FeedOptions from './components/FeedOptions/feedoptions'


export default function App() {
	const [feed, setFeed] = useState('https://newsapi.org/v2/top-headlines?country=us&apiKey=569386ab4fcf4954aee7dd0351c13cc0')
	const [feedOptionsOpen, setFeedOptionsOpen] = useState(false)
	const [contRef, setRef] = useState(React.createRef())

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

	const toggleFeedOptions = () => {
		setFeedOptionsOpen(!feedOptionsOpen)
	}

	return (
		<StateProvider initialState={initialState} reducer={reducer}>

			<Navbar toggleFO={toggleFeedOptions} />

			<div className="container">
				<Router>
					<Switch>
						<Route
							exact path="/"
							render={() =>
								<>
									{feedOptionsOpen && <FeedOptions setFeed={setFeed} />}
									<Newsfeed feed={feed} />
								</>
							} />
						<Route path="/profile" component={Profile} />
					</Switch>
				</Router>
			</div>
		</StateProvider>
	)
}
