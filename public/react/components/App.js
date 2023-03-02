import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Reader } from './Reader';
import { Writer } from './Writer';

// import and prepend the api url to any fetch calls
import apiURL from '../api';





export const App = () => {

	const [pages, setPages] = useState([]);
	const [state, setState] = useState('default');
	const [page, setPage] = useState(null);


	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	let view;
	switch(state) {
		case 'default':
			view = (
				<div className="pages-list">
					<PagesList pages={pages} setState={setState} setPage={setPage}/>
				</div>
			);
			break;
		case 'reader':
			view = (
				<div className="reader">
					<Reader page={page} setState={setState}/>
				</div>
			);
			break;
		case 'writer':
			view = (
				<div className="writer">
					<Writer setState={setState}/>
				</div>
			);
			break;
		default:
			view = null;
			break;
	}

	return (
		<main>	
			<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			<button variant="primary" onClick={() => setState('writer')}>Add new article</button>
			{view}
		</main>
	)
}