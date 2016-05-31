'use strict'

import React from 'react'
import { Link } from 'react-router'

import API from './API'
import Dispatcher from './Dispatcher'

class Profile extends React.Component {
    render() {
        let user = this.props.user;
        if (!user) {
            return null;
        }

        let tab = this.state.tab;

        return (
            <div className='site-wrap'>
                 <div className='profile'>
                    <form ref='userImageForm' className='picture'>
                        <label htmlFor='user-image'>
                            <input id='user-image' type='file' name='image' onChange={ this.handleUserImage } />
                            <img src={ user.image_url ? INDEX + user.image_url : '/images/avatar.png' } />
                        </label>
                    </form>
                    <div className='info'>
                        <h3>{ user.firstname } { user.lastname }</h3>
                        <p>{ user.birthdate }, { user.gender }</p>
                        <button onClick={ this.toggleEdit }>Edit Profile</button>
                    </div>

                    <div className='myhoops'>
                        <div className='filter'>
                            <p onClick={ this.setTab.bind(this, 'my-hoops') } style={{ color: tab == 'my-hoops' && '#ff6b00' }}>My hoops</p>
                            <p onClick={ this.setTab.bind(this, 'other-hoops') } style={{ color: tab == 'other-hoops' && '#ff6b00' }}>Other hoops</p>
                        </div>
                        <div className='gallery'>
                            { this.hoops() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    state = {
        myHoops: null,
        otherHoops: null,
        tab: 'my-hoops',
        editing: false,
    }
    componentDidMount() {
       this.getMyHoops(); 
       this.getOtherHoops(); 
    }
    hoops = () => {
        let myHoops = this.state.myHoops;
        let otherHoops = this.state.otherHoops;

        switch (this.state.tab) {
        case 'my-hoops':
            return myHoops ? myHoops.map(function(hoop) {
                return <Link key={ hoop.id } to={ '/hoop/' + hoop.id }><img key={ hoop.data.featured_story.id } src={ INDEX + hoop.data.featured_story.image_url } /></Link>
            }) : null;
        case 'other-hoops':
            return otherHoops ? otherHoops.map(function(hoop) {
                return <Link key={ hoop.id } to={ '/hoop/' + hoop.id }><img key={ hoop.data.featured_story.id } src={ INDEX + hoop.data.featured_story.image_url } /></Link>
            }) : null;
        }
    }
    getMyHoops() {
        API.getMyHoops((hoops) => {
            this.setState({ myHoops: hoops });
        }, (response) => {
            alert('Failed to get my hoops!');
        });
    }
    getOtherHoops() {
        API.getOtherHoops((hoops) => {
            this.setState({ otherHoops: hoops });
        }, (response) => {
            alert('Failed to get other hoops');
        });
    }
    setTab = (tab) => {
        this.setState({ tab: tab });
    }
    handleUserImage = (event) => {
        API.updateUserImage(new FormData(this.refs.userImageForm), () => {
            Dispatcher.dispatch({ type: 'refresh-user' });
        }); 
    }
}

module.exports = Profile;
