import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			pass: ''
		}
		this.signUp = this.signUp.bind(this);
	}

	signUp() {
		alert("I m working!");
		axios.post('/api/users', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.pass
		})
		.then(res => {
			console.log('res', res);
			if (typeof res.data.errors === 'undefined') alert("Success!");
			else alert("Fail!");
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	render() {
		return (
			<div>
				<h1>Sign Up page</h1>

				<div>Name:</div>
				<Form.Control 
					type="text" 
					placeholder="Enter name"
					value={this.state.name} 
					onChange={evt => this.setState({name: evt.target.value})}
				/>
				<br />

				<div>Email:</div>
				<Form.Control 
					type="text" 
					placeholder="Enter email"
					value={this.state.email} 
					onChange={evt => this.setState({email: evt.target.value})}
				/>
				<br />

				<div>Password:</div>
				<Form.Control 
					type="text" 
					placeholder="Enter password"
					value={this.state.pass} 
					onChange={evt => this.setState({pass: evt.target.value})}
				/>
				<br />

				<Button variant="outline-success" onClick={this.signUp}>Sign Up</Button>
			</div>
		);
	}
}