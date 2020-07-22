import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import io from 'socket.io-client';

export default class TopNav extends Component {
	render() {
		return(
			<div>
				<Navbar bg="dark" variant="dark" expand='sm' sticky="top">
					<Navbar.Brand href="/">Auth-Table</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="mr-auto">
							<Nav.Link href='/'>Home</Nav.Link>
							<Nav.Link href='/login'>Sign In</Nav.Link>
							<Nav.Link href='/registration'>Sign Up</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}