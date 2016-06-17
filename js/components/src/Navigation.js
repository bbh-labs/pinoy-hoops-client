'use strict'

import React from 'react'
import { Link } from 'react-router'
import browserHistory from './browserHistory'
import cx from 'classnames'

import API from './API'
import Dispatcher from './Dispatcher'

class Navigation extends React.Component {
	render() {
		let user = this.props.user;
		let pushMenuOpen = this.state.pushMenuOpen;

		if (user) {
			return (
					<nav className={cx('pushmenu pushmenu-left', pushMenuOpen && 'pushmenu-open')}>
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
					<nav className={cx('pushmenu pushmenu-left', pushMenuOpen && 'pushmenu-open')}>
						<Link to='/map'><img src="images/logo_light.png"/></Link>
						<a href="#" onClick={ this.login }>Login</a>
						<Link to='/about'>About</Link>
						<a href="mailto:donate@pinoyhoops.com?Subject=Donation%20for%20hoop" target="_top">Donate</a>
					</nav>
			)
		}
	}
	state = {
		pushMenuOpen: false,
	}
	componentDidMount() {
		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'nav-list-click':
				let pushMenuOpen = this.state.pushMenuOpen;
				console.log(!pushMenuOpen);

				this.setState({ pushMenuOpen: !pushMenuOpen });
				break;
			}
		});
	}
	componentWillUnmount() {
		Dispatcher.unregister(this.dispatcherID);
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
