//importing react and it's components
import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Reader } from './Reader';
import { Writer } from './Writer';
import { Editor } from './Editor';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

//navbar import 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';


export const App = () => {

	const [pages, setPages] = useState([]);
	const [state, setState] = useState('default');
	const [page, setPage] = useState(null);
	

	// MOCK LOGIN, TO BE REPLACED WITH REAL LOGIN IN PRODUCTION

	const [user, setUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	console.log(user)

	async function fetchUsers(){
		try {
			const response = await fetch(`${apiURL}/users`);
			const usersData = await response.json();
			setAllUsers(usersData);
			// Set initial user only if user state is not set already
			if (!user) {
				setUser(usersData[0]);
			}
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	// END MOCK LOGIN

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
		fetchUsers();
	}, []);

	let view;
	switch(state) {
		case 'default':
			view = (
				<div className="pages-list">
					<PagesList 
						pages={pages} 
						setState={setState} 
						setPage={setPage} 
						fetchPages={fetchPages}
					/>
				</div>
			);
			break;
		case 'reader':
			view = (
				<div className="reader">
					<Reader 
						user={user} 
						page={page} 
						setState={setState} 
						fetchPages={fetchPages}
					/>
				</div>
			);
			break;
		case 'writer':
			view = (
				<div className="writer">
					<Writer 
						setState={setState} 
						user={user} 
						pages={pages} 
						setPages={setPages} 
						setPage={setPage}  
						fetchPages={fetchPages}
						/>
				</div>
			);
			break;
		case 'editor':
			view = (
				<div className="editor">
					<Editor 
						setState={setState} 
						user={user} 
						pages={pages} 
						setPages={setPages} 
						setPage={setPage} 
						fetchPages={fetchPages} 
						page={page}/>
				</div>
			);
			break;
		default:
			view = null;
			break;
	}

	return ( <>
			
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand  style={{ cursor: 'pointer' }} onClick={() => setState('default')}>WikiVerse</Navbar.Brand>
				<h2></h2>
				<Nav className="me-auto">
					<Nav.Link onClick={() => setState('default')}>All articles</Nav.Link>
					<Nav.Link onClick={() => setState('writer')}>Write new</Nav.Link>
				</Nav>

					{/* mock login, to be replaced with real login in production */}
					<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Nav.Link href="#features">Logged in as:&nbsp;&nbsp; </Nav.Link>
							<Form.Select aria-label="Default select example" className="form-select bg-dark text-white"  value={user?.id || ''} onChange={(event) => {
								const selectedUserId = parseInt(event.target.value);
								const selectedUser = allUsers.find(user => user.id === selectedUserId);
								setUser(selectedUser);
							}}>
								{allUsers.map((user) => {
									return <option key={user.id} value={user.id}>{user.name}</option>
								})}
							</Form.Select>
						</Navbar.Collapse>
					{/* end mock login */}

			</Container>
		</Navbar>
		<main>
			{view}
		</main>
	</>)
}