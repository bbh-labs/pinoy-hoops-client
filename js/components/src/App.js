'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import browserHistory from './browserHistory'

import Dispatcher from './Dispatcher';
import API from './API';

import About from './About'
import Activities from './Activities'
import AddHoop from './AddHoop'
import Home from './Home'
import Hoop from './Hoop'
import Login from './Login'
import LoginEmail from './LoginEmail'
import Map from './Map'
import Navigation from './Navigation'
import Overlay from './Overlay'
import Profile from './Profile'
import Signup from './Signup'
import Story from './Story'

/*
	{ showNavigation ? <Navigation { ...this.state } /> : null }
	{ showNavigation ? <input type='checkbox' id='nav-trigger' className='nav-trigger' /> : null }
	{ showNavigation ? <label htmlFor='nav-trigger'></label> : null }
	{ showNavigation ? <Overlay /> : null }
	{ this.props.children && React.cloneElement(this.props.children, this.state)
*/

class App extends React.Component {
	render() {
		return (
			<div id='app' className="pushmenu-push">
				<Navigation { ...this.state } />

				<div className="container-fluid">
					<section className="buttonset">
						<div id="nav_list">Menu</div>
					</section>
				</div>

		    <section className="content">
					{ this.props.children && React.cloneElement(this.props.children, this.state) }
				</section>
			</div>
		)
	}
	state = {
		user: null,
	}
	componentDidMount() {
		this.checkLoggedIn();

		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'refresh-user':
				this.checkLoggedIn();

				if (payload.goto)
					browserHistory.replace(payload.goto);

				break;

			case 'hide-sidebar':
				let sidebar = document.getElementById('nav-trigger');

				if (sidebar)
					sidebar.checked = false;

				break;
			}
		});
	}
	checkLoggedIn() {
		API.isLoggedIn((user) => {
			this.setState({ user: user });
		}, () => {
			this.setState({ user: null });
		});
	}
}

function hideSidebar() {
	//Dispatcher.dispatch({ type: 'hide-sidebar' });
}

ReactDOM.render((
	<Router history={ browserHistory }>
		<Route path='/' component={ App }>
			<IndexRoute component={ Home } onEnter={ hideSidebar } />
			<Route path='/about' component={ About } onEnter={ hideSidebar } />
			<Route path='/activities' component={ Activities } onEnter={ hideSidebar } />
			<Route path='/add-hoop' component={ AddHoop } onEnter={ hideSidebar } />
			<Route path='/hoop/:hoopID' component={ Hoop } />
			<Route path='/login' component={ Login } onEnter={ hideSidebar } />
			<Route path='/login-email' component={ LoginEmail } />
			<Route path='/map' component={ Map } onEnter={ hideSidebar } />
			<Route path='/profile' component={ Profile } onEnter={ hideSidebar } />
			<Route path='/signup' component={ Signup } />
			<Route path='/story/:storyID' component={ Story } />
		</Route>
	</Router>
), document.getElementById('root'));
