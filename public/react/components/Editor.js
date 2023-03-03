import React, {useState} from 'react';


import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const Editor = ({setState, user, pages, setPages, setPage, fetchPages, page}) => {

    const [title, setTitle] = useState(page.title);
    const [content, setContent] = useState(page.content);
    const [tagsToggle, setTagsToggle] = useState(false);
    const [author, setAuthor] = React.useState(null);
    const [tags, setTags] = React.useState(null);

    console.log('title: ' + title + ' content: ' + content + ' tags: ' + tags);

    async function fetchData(){
		try {
			const response = await fetch(`${apiURL}/wiki/${page.slug}`);
			const data = await response.json();
            console.log('data' +  data)
			setAuthor(data.author.name);
            setTags(data.tags)
            console.log('author' +  author)
            console.log('tags' +  author)
            console.log('data' +  data)
            {tags && setTagsToggle(true)}
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}



  React.useEffect( () => {

      fetchData();
      setTitle(page.title);
      setContent(page.content);
  }, [])

    const handleContentChange = (e) => {
        const { value } = e.target;
        // Replace all newline characters with HTML line breaks
        const newValue = value.replaceAll('\n', '<br />');
        setContent(newValue);
    };

    const handleTagsChange = (e) => {
        const { value } = e.target;
        // Ensure that the user only enters tags separated by spaces
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setTags(value);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await fetch(`${apiURL}/wiki/${page.slug}`, {
              method: 'PUT',
              headers: {
                 'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                 title: title,
                 content: content,
                 tags: tags.toLowerCase(),
                 name : user.name,
                 email : user.email
              })
           });
           const updatedPage = await response.json();
           // find the index of the updated page in the pages array
           const pageIndex = pages.findIndex(p => p.slug === updatedPage.slug);
           // replace the old page with the updated page
           setPages([
              ...pages.slice(0, pageIndex),
              updatedPage,
              ...pages.slice(pageIndex + 1)
           ]);
           setPage(updatedPage);
           setTitle('');
           setContent('');
           setTags('');
           fetchPages();
           setState('reader');
        } catch (error) {
           console.error(error);
        }
     };
     
     
   
     
     return (
        <>
            <Form onSubmit={handleSubmit}>
            <FloatingLabel
                controlId="titleInput"
                label="Article Title"
                className="mb-3"
            >
            <Form.Control 
                type="text" 
                placeholder="My Title" 
                onChange={(e)=>{setTitle(e.target.value)}}
                value={title}
            />
            </FloatingLabel>

            <FloatingLabel
                controlId="contentInput"
                label="Your text"
                className="mb-3"
            >
            <Form.Control
                as="textarea"
                placeholder="Your text goes here..." 
                rows={10}
                style={{ minHeight: '150px', width: '100%' }}
                onKeyDown={(e) => {
                    e.target.style.height = '0px';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onInput={handleContentChange}
                value={content}
            />
            </FloatingLabel>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check 
                type="checkbox" 
                label="Include tags" 
                checked={tagsToggle}
                onChange={()=> setTagsToggle(!tagsToggle)}/>
            </Form.Group>
            
            {tagsToggle &&
                <FloatingLabel 
                    controlId="tagsInput"
                    label="Enter tags, separated by spaces" 
                    className="mb-3"
                >
                <Form.Control 
                    type="text" 
                    placeholder="Enter tags" 
                    value={tags.map(tag => tag.name).join(' ')} 
                    onChange={handleTagsChange} 
                />
                </FloatingLabel>
            }

            <Button 
                variant="primary" 
                type="submit"
            >
                Submit
            </Button>
            </Form>
        </>
    )}