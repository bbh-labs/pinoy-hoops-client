'use strict'

import React from 'react'
import { Link } from 'react-router'
import browserHistory from './browserHistory'

import API from './API'
import Dispatcher from './Dispatcher'

class Navigation extends React.Component {
	render() {
		let user = this.props.user;

		if (user) {
			return (
					<nav className="pushmenu pushmenu-left">
						<Link to='/map'><img src="images/logo_light.png"/></Link>
						<Link to='/profile'>
							<div className="sidebar_userprofile">
								<img src={ user.image_url } />
								<p>{ user.firstname }</p>
							</div>
						</Link>
						<Link to='/about'>About</Link>
						<a href="mailto:donate@pinoyhoops.com?Subject=Donation%20for%20hoop" target="_top">Donate</a>
						<a href="#" onClick={ this.logout }>Sign out</a>
					</nav>
			)
		} else {
			return (
					<nav className="pushmenu pushmenu-left">
						<Link to='/map'><img src="images/logo_light.png"/></Link>
						<a href="#" onClick={ this.login }>Login</a>
						<Link to='/about'>About</Link>
						<a href="mailto:donate@pinoyhoops.com?Subject=Donation%20for%20hoop" target="_top">Donate</a>
					</nav>
			)
		}
	}
	componentDidMount() {
		$(document).ready(function() {
	    let $menuLeft = $('.pushmenu-left');
	    let $nav_list = $('#nav_list');

	    $nav_list.click(function() {
	      $(this).toggleClass('active');
	      $('.pushmenu-push').toggleClass('pushmenu-push-toright');
	      $menuLeft.toggleClass('pushmenu-open');
	    });
	  });
	}
	login(event) {
		event.preventDefault();

		browserHistory.replace('/login');
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
