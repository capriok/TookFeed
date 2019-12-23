import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import './feedoptions.css'
import Filters from './filters'
import { Transition } from 'react-spring/renderprops'

export default function FeedOptions({ setFeed }) {
	const [searchQuery, setSearchQuery] = useState('')
	const [advOpOpen, setadvOpOpen] = useState(true)

	const [query, setQuery] = useState()
	const [sources, setSources] = useState()
	const [category, setCategory] = useState()
	const [country, setCountry] = useState()
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [language, setLanguage] = useState()
	const [{ endpoint, options }, dispatch] = useStateValue()

	const headlineSearch = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=569386ab4fcf4954aee7dd0351c13cc0`

	const handleHeadlineSearch = (e) => {
		e.preventDefault()
		setFeed(headlineSearch)
	}

	const handleAdvOpDrop = () => {
		dispatch({
			type: 'filter',
			endpoint: {
				everything: false,
				headlines: false,
				sources: false,
			}
		})
		setadvOpOpen(!advOpOpen)
	}

	const applyOptions = (e) => {
		e.preventDefault()
		dispatch({
			type: 'pass',
			options: {
				q: query,
				sources: sources,
				category: category,
				country: country,
				to: startDate,
				from: endDate,
			}
		})
	}

	useEffect(() => {
		console.log(endpoint);
		console.log(options);
	}, [applyOptions])

	return (
		<div className={'feedoptionscontainer'}>
			<div className='feedoptionscontent'>
				<div className='feedophead'>Feed Options</div>

				<form className='feedopbody' onSubmit={applyOptions}>
					<div className="fop">
						<h4>Search Headlines</h4>
						<div className='foform'>
							<form onSubmit={handleHeadlineSearch}>
								<input type='text' onChange={e => setSearchQuery(e.target.value)}></input>
								<button>Search</button>
							</form>
						</div>
					</div>
					<div className="fop">
						<div></div>
						<label onClick={handleAdvOpDrop} className="fopdrop"><span>Advanced</span></label>
						<Transition
							items={advOpOpen}
							from={{ height: 0, opacity: 0 }}
							enter={{ height: 'auto', opacity: 1 }}
							leave={{ height: 0, opacity: 0 }}
							config={{ duration: 200 }}>
							{advOpOpen => advOpOpen && ((props) => <div style={props}>
								<Filters
									query={query}
									setQuery={setQuery}
									sources={sources}
									setSources={setSources}
									category={category}
									setCategory={setCategory}
									country={country}
									setCountry={setCountry}
									startDate={startDate}
									setStartDate={setStartDate}
									endDate={endDate}
									setEndDate={setEndDate}
									language={language}
									setLanguage={setLanguage} />
							</div>
							)}
						</Transition>
					</div>
					<div className='fosubmit'>
						<button>Apply Options</button>
						<span>Clear Filters</span>
					</div>
				</form>
			</div>
		</div >
	)
}
