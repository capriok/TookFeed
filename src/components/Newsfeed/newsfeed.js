import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../state'
import './newsfeed.css'
import badge from './img/badge.png'
import newsapi from '../../apis/newsapi.js'


export default function NewsFeed() {
	const [{ auth, endpoint, options }, dispatch] = useStateValue()
	const [page, setPage] = useState(2)
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(5)
	const [articles, setArticles] = useState([])

	function prevPage() {
		setPage(page - 1)
		setStart(start - 5)
		setEnd(end - 5)
		window.scrollTo(0, 0)
	}

	function nextPage() {
		setPage(page + 1)
		setStart(start + 5)
		setEnd(end + 5)
		window.scrollTo(0, 0)
	}

	const query = options.q
	const sources = options.sources
	const category = options.category
	const country = options.country
	const to = options.to
	const from = options.from
	const language = options.language

	const request = async () => {
		const KEY = '569386ab4fcf4954aee7dd0351c13cc0';
		let type = Object.keys(endpoint).filter(k => endpoint[k])
		if (type.toString() === 'headlines') {
			type = `top-${type.shift()}`
		}
		let endpointType = type.toString()

		const res = await newsapi
			.get(`/${endpointType}`, {
				params: {
					q: query,
					apiKey: KEY
				}
			})
		console.log(res);

		let articles = res.data.items
		setArticles(articles)
	}

	return (
		<>
			<div className='feedwrap'>
				{articles.slice(start, end).map((articles, index) => (
					<li className='post' key={index}>
						{articles.source.name === 'CNN' && (
							<img className='badge' src={badge} alt='badge'></img>
						)}
						<a href={articles.url} target='_blank' rel='noopener noreferrer'>
							<div className='title'>{articles.title}</div>
						</a>
						<div className='image'>
							<img src={articles.urlToImage} alt=''></img>
						</div>
						<div className='description'>{articles.description}</div>
						<div className='author'>By | {articles.author}</div>
						<div className='updated'>
							Updated at {new Date(articles.publishedAt).toLocaleTimeString()}{' '}
							on {new Date(articles.publishedAt).toLocaleDateString()}
						</div>
					</li>
				))}
				<div className='pagination'>
					{page > 2 && (
						<button className='pagebtn' onClick={prevPage}>
							Previous
						</button>
					)}
					{end <= 15 && (
						<button className='pagebtn' onClick={nextPage}>
							Next
						</button>
					)}
				</div>
			</div>
		</>
	)
}


////////////////////////////////////
//LEGACY GET REQUEST FROM STATIC URL
	// const feed = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=569386ab4fcf4954aee7dd0351c13cc0'
	// 	const res = await fetch(feed)
	// 	const json = await res.json()
	// 	let articles = json.articles.map(articles => articles)
	// 	setArticles(articles)	
////////////////////////////////////

/*
			const NewsAPI = require('newsapi');
			const newsapi = new NewsAPI('YOUR_API_KEY');

			// To query top headlines
			// All options passed to topHeadlines are optional, but you need to include at least one of them
			newsapi.v2.topHeadlines({
				q: 'trump',
				category: 'politics',
				language: 'en',
				country: 'us'
			}).then(response => {
				console.log(response);
				{
					status: "ok",
					articles: [...]
				}
			});

			// To query everything
			// You must include at least one q, source, or domain
			newsapi.v2.everything({
				q: 'trump',
				sources: 'bbc-news,the-verge',
				domains: 'bbc.co.uk,techcrunch.com',
				from: '2017-12-01',
				to: '2017-12-12',
				language: 'en',
				sortBy: 'relevancy',
				page: 2
			}).then(response => {
				console.log(response);
				{
					status: "ok",
					articles: [...]
				}
			});

			// To query sources
			// All options are optional
			newsapi.v2.sources({
				category: 'technology',
				language: 'en',
				country: 'us'
			}).then(response => {
				console.log(response);
				{
					status: "ok",
					sources: [...]
				}
			});
*/