import React, {useState} from 'react';


import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';




export const Writer = ({setState, user}) => {

    const [tagsToggle, setTagsToggle] = useState(false);
    const [tags, setTags] = useState('');

    const handleTagsChange = (e) => {
        const { value } = e.target;
        // Ensure that the user only enters tags separated by commas
        if (/^[a-zA-Z, ]*$/.test(value)) {
          setTags(value);
        }
      };

    return (
        <>
            <Form>
            <FloatingLabel
                controlId="titleInput"
                label="Article Title"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="My Title" />
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
                />
            </FloatingLabel>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Include tags" onChange={()=> setTagsToggle(!tagsToggle)}/>
            </Form.Group>
            
            {tagsToggle &&
                <FloatingLabel controlId="tagsInput" label="Enter tags, separated by commas" className="mb-3">
                    <Form.Control type="text" placeholder="Enter tags" value={tags} onChange={handleTagsChange} />
                </FloatingLabel>
            }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )}