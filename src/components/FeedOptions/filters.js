import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import { Transition } from 'react-spring/renderprops'
import './feedoptions.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters(
   {
      query, setQuery,
      sources, setSources,
      category, setCategory,
      country, setCountry,
      startDate, setStartDate,
      endDate, setEndDate,
      language, setLanguage
   }) {

   const [{ endpoint, options }, dispatch] = useStateValue()
   const [endpointOpen, setEndpointOpen] = useState(false)

   const boxes = ['Everything', 'Headlines', 'Sources']

   const handlesetFilters = (e) => {
      if (!endpointOpen) setEndpointOpen(!endpointOpen)
      let box = e.target.name

      switch (box) {
         case 'everything':
            dispatch({ type: 'filter', endpoint: { everything: !endpoint.everything, headlines: false, sources: false } })
            break;

         case 'headlines':
            dispatch({ type: 'filter', endpoint: { everything: false, headlines: !endpoint.headlines, sources: false } })
            break;

         case 'sources':
            dispatch({ type: 'filter', endpoint: { everything: false, headlines: false, sources: !endpoint.sources } })
            break;
      }
      setQuery('')
      setSources('')
      setCategory('')
      setCountry('')
      setStartDate('')
      setEndDate('')
      setLanguage('')
   }

   useEffect(() => {
      const end = Object.values(endpoint)
      if (!end.includes(true)) {
         setEndpointOpen(false)
      }

   }, [handlesetFilters])

   // useEffect(() => {
   //    console.log(q);
   //    console.log(sources);
   //    console.log(category);
   //    console.log(country);
   //    console.log(startDate);
   //    console.log(endDate);
   //    console.log(language);
   //    console.log(options);

   // }, [q, sources, category, country, startDate, endDate, language])

   return (
      <>
         <div className='fofilter'>
            <h4>Filter type</h4>
            <div className="boxfilters">
               <li><label>
                  <div><input
                     className="box"
                     type="checkbox"
                     name="everything"
                     value={e => e.target.name}
                     onChange={handlesetFilters}
                     checked={endpoint.everything}
                  /></div>
                  <span>{boxes[0]}</span>
               </label></li>
               <li><label>
                  <div><input
                     className="box"
                     type="checkbox"
                     name="headlines"
                     value={e => e.target.name}
                     onChange={handlesetFilters}
                     checked={endpoint.headlines}
                  /></div>
                  <span>{boxes[1]}</span>
               </label></li>
               <li><label>
                  <div><input
                     className="box"
                     type="checkbox"
                     name="sources"
                     value={e => e.target.name}
                     onChange={handlesetFilters}
                     checked={endpoint.sources}
                  /></div>
                  <span>{boxes[2]}</span>
               </label></li>
            </div>
            <Transition
               items={endpointOpen}
               from={{ height: 0, opacity: 0 }}
               enter={{ height: 'auto', opacity: 1 }}
               leave={{ height: 0, opacity: 0 }}
               config={{ duration: 200 }}>
               {endpointOpen => endpointOpen && ((props) => <div style={props}>
                  <form onSubmit={e => e.preventDefault()}>
                     <div className="inputfilters">
                        {endpoint.headlines || endpoint.everything ?
                           <input type="text" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} /> : undefined
                        }
                        {endpoint.headlines || endpoint.everything ?
                           <input type="text" placeholder="Sources" value={sources} onChange={e => setSources(e.target.value)} /> : undefined
                        }
                        {endpoint.headlines || endpoint.sources ?
                           <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} /> : undefined
                        }
                        {endpoint.headlines || endpoint.sources ?
                           <input type="text" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} /> : undefined
                        }
                        {endpoint.everything &&
                           <DatePicker placeholderText="Start Date" value={startDate} onChange={date => setStartDate(date)} selected={startDate} />
                        }
                        {endpoint.everything &&
                           <DatePicker placeholderText="End Date" value={endDate} onChange={date => setEndDate(date)} selected={endDate} />
                        }
                        {endpoint.sources &&
                           <input type="text" placeholder="Language" value={language} onChange={e => setLanguage(e.target.value)} />}
                     </div>
                  </form>

               </div>
               )}
            </Transition>
         </div>
      </>
   )
}