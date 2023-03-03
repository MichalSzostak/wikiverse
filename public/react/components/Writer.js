import React, {useState} from 'react';


import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

// import and prepend the api url to any fetch calls
import apiURL from '../api';


export const Writer = ({setState, user, pages, setPages, setPage, fetchPages}) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tagsToggle, setTagsToggle] = useState(false);
    const [tags, setTags] = useState('');

    console.log('title: ' + title + ' content: ' + content + ' tags: ' + tags);




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
            const response = await fetch(`${apiURL}/wiki`, {
                method: 'POST',
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
            const createdPage = await response.json();
            setPages([...pages, createdPage]);
            setPage(createdPage);
            setTitle('');
            setContent('');
            setTags('');
            fetchPages(); // Call fet
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
                onChange={(e)=>{setContent(e.target.value)}}
            />
            </FloatingLabel>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check 
                type="checkbox" 
                label="Include tags" 
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
                        value={tags} 
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