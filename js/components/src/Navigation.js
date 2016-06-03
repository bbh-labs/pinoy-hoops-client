'use strict'

import React from 'react'
import { Link, hashHistory } from 'react-router'

import API from './API'
import Dispatcher from './Dispatcher'

class Navigation extends React.Component {
	render() {
		let user = this.props.user;

		if (user) {
			return (
			   <ul className='navigation'>
				   <li className='nav-item'><Link to='/'><img src='/images/logo_light.png' /></Link></li>
				   <li className='nav-item'>
					   <Link to='/profile' onClick={ hideSidebar }>
						   <div className='menuprofile'>
							   <img src={ contentURL(user.image_url, '/images/avatar.png') } />{ user.firstname } { user.lastname }
						   </div>
					   </Link>
				   </li>
				   <li className='nav-item'><Link to='/map' onClick={ hideSidebar }>Map</Link></li>
				   <li className='nav-item'><Link to='/add-hoop' onClick={ hideSidebar }>Add a hoop</Link></li>
				   <li className='nav-item'><Link to='/activities' onClick={ hideSidebar }>Activity feed</Link></li>
				   <li className='nav-item'><Link to='/about' onClick={ hideSidebar }>About</Link></li>
				   <li className='nav-item'><a href='#' onClick={ this.logout }>Logout</a></li>
			   </ul>
			)
		} else {
			return (
			   <ul className='navigation'>
				   <li className='nav-item'><Link to='/'><img src='/images/logo_light.png' /></Link></li>
				   <li className='nav-item'><Link to='/about' onClick={ hideSidebar }>About</Link></li>
				   <li className='nav-item'><Link to='/login' onClick={ hideSidebar }>Add a hoop</Link></li>
			   </ul>
			)
		}
	}
	logout(event) {
		event.preventDefault();

		API.logout(() => {
			Dispatcher.dispatch({ type: 'refresh-user', goto: '/login' });

			hideSidebar();
		}, () => {
			alert('Failed to log out!');
		});
	}
}

function hideSidebar() {
	Dispatcher.dispatch({ type: 'hide-sidebar' });
}

module.exports = Navigation;
