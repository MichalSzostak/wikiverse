import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

// import and prepend the api url to any fetch calls
import apiURL from '../api.js';

export const Reader = ({page, user, setState, fetchPages}) => {
  console.log(fetchPages);


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
    
  const showControls = user && author && user.id === page.authorId;
  const shouldShowControls = Boolean(showControls);
  console.log(showControls);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki/${page.slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      fetchPages(); 
      setState('default');
      console.log(data);
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }

  const handleEdit = async () => {

      setState('editor');

  }

  return (<>

            {showControls && <>
            <Button variant="warning" onClick={handleEdit}>Edit article</Button>
            <Button variant="danger" onClick={handleDelete}>Delete article</Button>
            </>}
            <h1>{page.title}</h1>
            <small>Author: {author}</small><br></br>
            <small>Published: {new Date(page.createdAt).toLocaleDateString()}</small><br></br>
            <small>Last Edited: {new Date(page.createdAt).toLocaleDateString()}</small><hr></hr>

            <div dangerouslySetInnerHTML={{ __html: page?.content.replace(/\n/g, '<br/>') }} /><hr></hr>
            <p>Tags: #{tags && tags.map(tag => tag.name).join(', #')}</p>
    </>)
} 
	