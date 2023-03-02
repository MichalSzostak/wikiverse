import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

// import and prepend the api url to any fetch calls
import apiURL from '../api.js';

export const Page = (props) => {

  const [detailsToggle, setDetailsToggle] = React.useState(false);
  const [author, setAuthor] = React.useState(null);
  const [tags, setTags] = React.useState(null);

  async function fetchData(){
		try {
			const response = await fetch(`${apiURL}/wiki/${props.page.slug}`);
			const data = await response.json();
			setAuthor(data.author.name);
      setTags(data.tags)
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}



  React.useEffect( () => {
    
    if (detailsToggle) {
      fetchData();
    }
  }, [detailsToggle])
    
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.page.title}</Card.Title>
        <Button variant={detailsToggle ?  "outline-primary" : "primary"  } onClick={() => setDetailsToggle(!detailsToggle)} >{!detailsToggle? 'Show Details' : 'Hide Details'}</Button>
        {detailsToggle && ( 
          <>
          <Card.Text>{props.page.content}</Card.Text>
          <ListGroup variant="flush" >
            <ListGroup.Item>
              Published: {new Date(props.page.createdAt).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>Author: {author}</ListGroup.Item>
            <ListGroup.Item>
              Tags: {tags && tags.map(tag => tag.name).join(', ')}
            </ListGroup.Item>
          </ListGroup>
          </>)}
      </Card.Body>
    </Card>
  )
} 
	