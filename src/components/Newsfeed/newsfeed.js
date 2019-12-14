import React, { useState, useEffect } from "react";
import { useStateValue } from '../../state'
import "./newsfeed.css";
import badge from "./img/badge.png"

////////////main api key////////////
//569386ab4fcf4954aee7dd0351c13cc0//

//backup api keys(testing)
// 64a57da735c94c7ca9b164ab5c3cb6e3
// 32d741fa6d244453bb472813043174ca
// 75ddc2508be94480a8bb05e57296ca97
// 5b0a5b215b5d472881c830c90648727c
// 69ff4adfecfd476e88c3ec2964ed2861

export default function NewsFeed() {
  const [page, setPage] = useState(2)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
  const [{ auth }] = useStateValue()
  const [feed, setFeed] = useState('https://newsapi.org/v2/top-headlines?country=us&apiKey=569386ab4fcf4954aee7dd0351c13cc0')
  const [articles, setArticles] = useState([]);

  const request = async () => {
    try {
      const res = await fetch(feed);
      const json = await res.json();
      let articles = json.articles.map(articles => articles);
      setArticles(articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    request();
  }, [feed])

  function prevPage() {
    setPage(page - 1)
    setStart(start - 5)
    setEnd(end - 5)
    window.scrollTo(0, 0);
  }

  function nextPage() {
    setPage(page + 1)
    setStart(start + 5)
    setEnd(end + 5)
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="container feedwrap">
        <div className="selector">
          <div className='selectorstatus'>{!auth.isAuthenticated ? 'Login to select Feeds' : auth.user.username}</div>
          <form className='feedform'>
            {!auth.isAuthenticated ? (
              <select className='feedform'>
                <option disabled>Login to select news feeds</option>
              </select>
            ) : (
                <select
                  onChange={e => setFeed(e.target.value)}
                  value={feed}
                  className='feedform'
                  id='feeds'
                >
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
                    <option value='https://newsapi.org/v2/top-headlines?sources=breitbart&apiKey=569386ab4fcf4954aee7dd0351c13cc0'>
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
              )}
          </form>
        </div>
        {articles.slice(start, end).map((articles, index) => (
          <li className="post" key={index}>
            {articles.source.name === 'CNN' && <img className="badge" src={badge} alt="badge"></img>}
            <a href={articles.url} target="_blank" rel="noopener noreferrer">
              <div className="title">{articles.title}</div>
            </a>
            <div className="image">
              <img src={articles.urlToImage} alt=""></img>
            </div>
            <div className="description">{articles.description}</div>
            <div className="author">By | {articles.author}</div>
            <div className="updated">
              Updated at {new Date(articles.publishedAt).toLocaleTimeString()}{" "}
              on {new Date(articles.publishedAt).toLocaleDateString()}
            </div>
          </li>
        ))}

        <div className="pagination">
          {page > 2 && <button className="pagebtn" onClick={prevPage}>Previous</button>}
          {end <= 15 && <button className="pagebtn" onClick={nextPage}>Next</button>}
        </div>

      </div>
    </>
  )
}