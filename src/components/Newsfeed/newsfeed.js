import React, { useState, useEffect } from "react";
import { useStateValue } from '../../state'
import "./newsfeed.css";
import badge from "./img/badge.png"

import FeedOptions from '../FeedOptions/feedoptions.js'

////////////main api key////////////
//569386ab4fcf4954aee7dd0351c13cc0//

//backup api keys(testing)
// 64a57da735c94c7ca9b164ab5c3cb6e3
// 32d741fa6d244453bb472813043174ca
// 75ddc2508be94480a8bb05e57296ca97
// 5b0a5b215b5d472881c830c90648727c
// 69ff4adfecfd476e88c3ec2964ed2861

export default function NewsFeed({ feed }) {
  const [{ auth }] = useStateValue()
  const [page, setPage] = useState(2)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(5)
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
    console.log(feed);
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
      <div className="feedwrap">
        {articles.slice(start, end).map((articles, index) => (
          <>
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
          </>
        ))}
        <div className="pagination">
          {page > 2 && <button className="pagebtn" onClick={prevPage}>Previous</button>}
          {end <= 15 && <button className="pagebtn" onClick={nextPage}>Next</button>}
        </div>
      </div>
    </>
  )
}