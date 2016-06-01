'use strict'

import React from 'react';
import { Link } from 'react-router';

class Login extends React.Component {
	render() {
		return (
			<div className='site-wrap'>
				 <div className='login'>
					<div className='logo'>
						<Link to='/'><img src='images/logo_light.png' /></Link>
					</div>
					<div className='login-content'>
						<a href='/auth/facebook'><button style={{ backgroundColor: '#3c5a99' }}>Login with Facebook</button></a>
						<a href='/auth/twitter'><button style={{ backgroundColor: '#00abf1' }}>Login with Twitter</button></a>
						<Link to='/login-email'><button style={{ backgroundColor: '#ff6b00' }}>Login with Email</button></Link>
						<p>Don&#39;t have an account? <Link to='/signup'><span style={{ color: '#fff' }}>Sign up here</span></Link></p>
					</div>
				 </div>
			</div>
		)
	}
}

module.exports = Login;
