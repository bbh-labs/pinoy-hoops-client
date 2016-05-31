'use strict'

import React from 'react'
import { Link, hashHistory } from 'react-router'

import API from './API'
import Dispatcher from './Dispatcher'

class LoginEmail extends React.Component {
    render() {
        return (
            <div className='site-wrap'>
                <div className='login'>
                    <div className='logo'>
                       <a href='index.html'><img src='images/logo_light.png' /></a>
                    </div>
                    <form className='login-email' onSubmit={ this.submit }>
                        <h4>Login with email</h4>
                        <input type='email' placeholder='Email' name='email' /><br />
                        <input type='password' placeholder='Password' name='password' /><br />
                        <button type='submit'>Login</button>
                        <p>Don&#39;t have an account? <Link to='/signup'><span style={{ color: '#fff' }}>Sign up here</span></Link></p>
                    </form>
                </div>
            </div>
        )
    }
    submit(event) {
        event.preventDefault();

        API.login(new FormData(event.target), () => {
            Dispatcher.dispatch({ type: 'refresh-user', goto: '/map' });
        }, (response) => {
            alert(response.statusText + ': failed to log in!');
        });
    }
}

module.exports = LoginEmail;
