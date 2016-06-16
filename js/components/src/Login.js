'use strict'

import React from 'react';
import { Link } from 'react-router';

import API from './API'
import Dispatcher from './Dispatcher'

class Login extends React.Component {
	render() {
		return (
			<section id="login">
				<div className="container-fluid">
					<div className="row">
						<div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
							<div className="logo">
								<img src="images/logo_light.png"/>
								<h3>Login to join the hoops community</h3>
								<div className="sociallogin">
									<a href='/auth/facebook' onClick={ this.login }><button>Facebook</button></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
	login(event) {
		if (!MOCKUP)
			return;

		event.preventDefault();

		API.login(data, () => {
			Dispatcher.dispatch({ type: 'refresh-user', goto: '/map' });
		}, (response) => {
			alert(response.statusText + ': failed to log in!');
		});
	}
}

module.exports = Login;
