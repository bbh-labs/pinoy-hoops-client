'use strict'

import React from 'react'
import { Link } from 'react-router'
import browserHistory from './browserHistory'

import API from './API'
import Dispatcher from './Dispatcher'

class Signup extends React.Component {
	render() {
		return (
			<div className='site-wrap'>
				 <div className='signup'>
					<div className='logo'>
						<Link to='/'><img src='images/logo_light.png' /></Link>
						<p>The home of all things basketball</p>
					</div>
					<div className='signup-content'>
						<form method='POST' onSubmit={ this.submit }>
							<label>First name: </label><input type='text' name='firstname' /><br/>
							<label>Last name: </label><input type='text' name='lastname' /><br/>
							<label>Email: </label><input type='email' name='email' /><br/>
							<label>Password: </label><input type='password' name='password' /><br/>
							<label>Age: </label><input type='date' name='birthdate' /><br/>
							<label>Gender: </label><input type='text' name='gender' /><br/>
							<label>Upload picture: </label>
							<label htmlFor='upload-image'>Select file<input id='upload-image' type='file' name='image' /></label><br/>
							<button type='submit'>Signup</button>
						</form>
						<p>Already have an account? <Link to='/login'><span style={{ color: '#fff' }}>Login here</span></Link></p>
					</div>
				 </div>
			</div>
		)
	}
	submit(event) {
		event.preventDefault();

		API.signup(new FormData(event.target), () => {
			alert('Successfully signed up!');
			Dispatcher.dispatch({ type: 'refresh-user', goto: '/map' });
		}, (response) => {
			alert(response.statusText + ': failed to sign up!');
		});
	}
}

module.exports = Signup;
