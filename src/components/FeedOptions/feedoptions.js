import React, { useState } from 'react'
import './feedoptions.css'

export default function FeedOptions({ setFeed }) {

   return (

      <div className={"feedoptionscontainer"}>
         <div className="feedoptionscontent">
            <div className="feedophead">Feed Options</div>

            <form className="feedopbody">
               <div className='foform'>
                  <h4>Search Headlines</h4>
                  <input type="text"></input>
               </div>
               <div className="foselector">
                  <h4>Preset Options</h4>
                  <select onChange={e => setFeed(e.target.value)}>
                     <optgroup label='General'>
                        <option value='https://newsapi.org/v2/top-headlines?country=us&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Top US News
					        	</option>
                     </optgroup>
                     <optgroup label='Politics'>
                        <option value='https://newsapi.org/v2/top-headlines?sources=breitbart-news&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Breitbart
					      	</option>
                        <option value='https://newsapi.org/v2/top-headlines?sources=associated-press&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Associated Press
						      </option>
                        <option value='https://newsapi.org/v2/top-headlines?sources=the-hill&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           The Hill
					      	</option>
                     </optgroup>
                     <optgroup label='Technology'>
                        <option value='https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Tech Crunch
					      	</option>
                        <option value='https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           The Verge
					      	</option>
                        <option value='https://newsapi.org/v2/top-headlines?sources=wired&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Wired
					      	</option>
                     </optgroup>
                     <optgroup label='Everything about'>
                        <option value='https://newsapi.org/v2/everything?q=qanon&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Qanon
				      		</option>
                        <option value='https://newsapi.org/v2/everything?q=javascript&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Javascript
					      	</option>
                        <option value='https://newsapi.org/v2/everything?q=apple&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
                           Apple
				      		</option>
                     </optgroup>
                  </select>
               </div>
               <div className="focheckbox">
                  <div className="type">
                     <h4>Filter by Type</h4>
                     <li>
                        <div><label><input type="checkbox"></input><span>Top Headlines</span></label></div>
                        <div><label><input type="checkbox"></input><span>Business</span></label></div>
                        <div><label><input type="checkbox"></input><span>Politics</span></label></div>
                        <div><label><input type="checkbox"></input><span>Technology</span></label></div>
                        <div><label><input type="checkbox"></input><span>Health</span></label></div>
                     </li>
                  </div>
                  <div className="region">
                     <h4>Filter by Region</h4>
                     <li>
                        <div><label><input type="checkbox"></input><span>United States</span></label></div>
                        <div><label><input type="checkbox"></input><span>United Kingdom</span></label></div>
                        <div><label><input type="checkbox"></input><span>Canada</span></label></div>
                        <div><label><input type="checkbox"></input><span>Mexico</span></label></div>
                        <div><label><input type="checkbox"></input><span>China</span></label></div>
                     </li>
                  </div>
                  <div className="source">
                     <h4>Filter by Source</h4>
                     <li>
                        <div><label><input type="checkbox"></input><span>Breitbart</span></label></div>
                        <div><label><input type="checkbox"></input><span>The Associate Press</span></label></div>
                        <div><label><input type="checkbox"></input><span>The Hill</span></label></div>
                        <div><label><input type="checkbox"></input><span>Tech Crunch</span></label></div>
                        <div><label><input type="checkbox"></input><span>The Verge</span></label></div>
                        <div><label><input type="checkbox"></input><span>Wired</span></label></div>
                     </li>
                  </div>
                  <div className="lang">
                     <h4>Filter by Language</h4>
                     <li>
                        <div><label><input type="checkbox"></input><span>English</span></label></div>
                        <div><label><input type="checkbox"></input><span>French</span></label></div>
                        <div><label><input type="checkbox"></input><span>Spanish</span></label></div>
                        <div><label><input type="checkbox"></input><span>Chinese</span></label></div>
                     </li>
                  </div>
               </div>

               <div className="fosubmit">
                  <button>Apply Options</button>
                  <span>Clear Filters</span>
               </div>
            </form>
         </div>
      </div >
   )
}
