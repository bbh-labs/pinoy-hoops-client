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

class App extends React.Component {
    render() {
        let showNavigation = true;

        if (this.props.location.pathname == '/')
            showNavigation = false;

        return (
            <div id='app'>
                { showNavigation ? <Navigation { ...this.state } /> : null }
                { showNavigation ? <input type='checkbox' id='nav-trigger' className='nav-trigger' /> : null }
                { showNavigation ? <label htmlFor='nav-trigger'></label> : null }
                { showNavigation ? <Overlay /> : null }
                { this.props.children && React.cloneElement(this.props.children, this.state) }
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

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ Home } />
            <Route path='/about' component={ About } />
            <Route path='/activities' component={ Activities } />
            <Route path='/add-hoop' component={ AddHoop } />
            <Route path='/hoop/:hoopID' component={ Hoop } />
            <Route path='/login' component={ Login } />
            <Route path='/login-email' component={ LoginEmail } />
            <Route path='/map' component={ Map } />
            <Route path='/profile' component={ Profile } />
            <Route path='/signup' component={ Signup } />
            <Route path='/story/:storyID' component={ Story } />
        </Route>
    </Router>
), document.getElementById('root'));
