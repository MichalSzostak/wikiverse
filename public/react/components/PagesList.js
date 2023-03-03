import React from 'react';
import Button from 'react-bootstrap/Button';




export const PagesList = ({pages, setState, setPage}) => {
	
	function startReader(index) {
		setState('reader');
		setPage(pages[index])
  	}

	

	return <>
		{
			pages.map((page, index) => {
				return <Button variant="outline-secondary" onClick={() => startReader(index)}>{page.title}</Button>
			})
		}
	</>
} 
