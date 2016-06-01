'use strict'

import React from 'react'
import { Link, hashHistory } from 'react-router'

import API from './API'

class Navigation extends React.Component {
	render() {
		let user = this.props.user;

		if (user) {
			return (
			   <ul className='navigation'>
				   <li className='nav-item'><Link to='/'><img src='/images/logo_light.png' /></Link></li>
				   <li className='nav-item'>
					   <Link to='/profile'>
						   <div className='menuprofile'>
							   <img src={ contentURL(user.image_url, '/images/avatar.png') } />{ user.firstname } { user.lastname }
						   </div>
					   </Link>
				   </li>
				   <li className='nav-item'><Link to='/map'>Map</Link></li>
				   <li className='nav-item'><Link to='/add-hoop'>Add a hoop</Link></li>
				   <li className='nav-item'><Link to='/activities'>Activity feed</Link></li>
				   <li className='nav-item'><Link to='/about'>About</Link></li>
				   <li className='nav-item'><a href='#' onClick={ this.logout }>Logout</a></li>
			   </ul>
			)
		} else {
			return (
			   <ul className='navigation'>
				   <li className='nav-item'><Link to='/'><img src='/images/logo_light.png' /></Link></li>
				   <li className='nav-item'><Link to='/about'>About</Link></li>
				   <li className='nav-item'><Link to='/login'>Add a hoop</Link></li>
			   </ul>
			)
		}
	}
	logout(event) {
		event.preventDefault();

		API.logout(() => {
			window.location.reload();
		}, () => {
			alert('Failed to log out!');
		});
	}
}

module.exports = Navigation;
