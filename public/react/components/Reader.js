import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

// import and prepend the api url to any fetch calls
import apiURL from '../api.js';

export const Reader = ({page, setState}) => {

  const [author, setAuthor] = React.useState(null);
  const [tags, setTags] = React.useState(null);


  console.log(page)

  async function fetchData(){
		try {
			const response = await fetch(`${apiURL}/wiki/${page.slug}`);
			const data = await response.json();
			setAuthor(data.author.name);
      setTags(data.tags)
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}



  React.useEffect( () => {

      fetchData();

  }, [])
    
  return (<>

            <Button variant="outline-secondary" onClick={() => setState('default')}>Back to list</Button>
            <h1>{page.title}</h1>
            <small>Author: {author}</small><br></br>
            <small>Published: {new Date(page.createdAt).toLocaleDateString()}</small><hr></hr>
            <p>{page.content}</p><hr></hr>
            <p>Tags: #{tags && tags.map(tag => tag.name).join(', #')}</p>
    </>)
} 
	