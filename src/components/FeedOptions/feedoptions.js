import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import { Transition } from 'react-spring/renderprops'
import Filters from './filters'
import './feedoptions.css'

export default function FeedOptions(
	{
		applyOptions,
		query, setQuery,
		sources, setSources,
		category, setCategory,
		country, setCountry,
		startDate, setStartDate,
		endDate, setEndDate,
		language, setLanguage
	}) {
	const [advOpOpen, setadvOpOpen] = useState(true)

	const [{ endpoint, options }, dispatch] = useStateValue()

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
	return (
		<div className={'feedoptionscontainer'}>
			<div className='feedoptionscontent'>
				<div className='feedophead'>Feed Options</div>

				<form className='feedopbody' onSubmit={applyOptions}>
					<div className="fop">
						<h4>Search Headlines</h4>
						<div className='foform'>
							<input type='text'></input>
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
