'use strict'

import React from 'react';
import { Link } from 'react-router';

import API from './API'
import Dispatcher from './Dispatcher'

class Hoop extends React.Component {
    render() {
        let hoop = this.state.hoop;
        if (!hoop)
            return null;

        let latestStories = this.state.latestStories;
        let tab = this.state.tab;

        return (
            <div className='site-wrap'>
                 <div className='hoopstory'>
                    <div className='heroimage'>
                        <img src={ hoop.data.featured_story ? INDEX + hoop.data.featured_story.image_url : '' } />
                        <h2>{ hoop.title }</h2>
                    </div>
                    <div className='hoop-info'>
                        <div className='userprofile'>
                            <img src={ hoop.user.image_url ? INDEX + hoop.user.image_url : '/images/avatar.png' } />
                            <h6>{ hoop.user.firstname } { hoop.user.lastname }</h6>
                        </div>
                        <div className='icons'>
                            <img src='/images/icon_share.png' />
                        </div>
                        <div className='description'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec enim dolor, facilisis id interdum id, gravida eget lacus. Nam congue urna massa, sit amet rutrum ipsum pellentesque eu. Praesent et </p>
                        </div>
                    </div>
                    <div className='filter'>
                        <p onClick={ this.setTab.bind(this, 'most-recent') } style={{ color: tab == 'most-recent' && '#ff6b00' }}>Most Recent</p>
                        <p onClick={ this.setTab.bind(this, 'most-liked') } style={{ color: tab == 'most-liked' && '#ff6b00' }}>Most Liked</p>
                        <p onClick={ this.setTab.bind(this, 'most-viewed') } style={{ color: tab == 'most-viewed' && '#ff6b00' }}>Most Viewed</p>
                    </div>
                    <div className='hoop-gallery'>
                        <li onClick={ this.addStory }>
                            <img src='/images/icon_plus.png' />
                        </li>
                        { this.stories() }
                    </div> 	
                 </div>
            </div>
        )
    }
    state = {
        hoop: null,
        mostCommentedStories: null,
        mostLikedStories: null,
        mostViewedStories: null,
        latestStories: null,
        tab: 'most-recent',
    }
    componentDidMount() {
        let hoopID = this.props.params.hoopID;

        API.getHoop({ hoopID: hoopID }, (hoop) => {
            this.setState({ hoop: hoop });
        }, (response) => {
            alert('Failed to get hoop');
        });

        API.getMostCommentedStories({ hoop_id: hoopID }, (stories) => {
            this.setState({ mostCommentedStories: stories });
        }, (response) => {
            alert('Failed to get most commented stories');
        });
        
        API.getMostLikedStories({ hoop_id: hoopID }, (stories) => {
            this.setState({ mostLikedStories: stories });
        }, (response) => {
            alert('Failed to get most liked stories');
        });
        
        API.getMostViewedStories({ hoop_id: hoopID }, (stories) => {
            this.setState({ mostViewedStories: stories });
        }, (response) => {
            alert('Failed to get most viewed stories');
        });
        
        API.getLatestStories({ hoop_id: hoopID }, (stories) => {
            this.setState({ latestStories: stories });
        }, (response) => {
            alert('Failed to get latest stories');
        });
    }
    stories() {
        let latestStories = this.state.latestStories;
        let mostViewedStories = this.state.mostViewedStories;
        let mostLikedStories = this.state.mostLikedStories;
        let mostCommentedStories = this.state.mostCommentedStories;

        switch (this.state.tab) {
        case 'most-recent':
            return latestStories ? latestStories.map(function(story) {
                return <li key={ story.id }><Link to={ '/story/' + story.id }><img src={ INDEX + story.image_url } /></Link></li>
            }) : null;

        case 'most-viewed':
            return mostViewedStories ? mostViewedStories.map(function(story) {
                return <li key={ story.id }><Link to={ '/story/' + story.id }><img src={ INDEX + story.image_url } /></Link></li>
            }) : null;

        case 'most-liked':
            return mostLikedStories ? mostLikedStories.map(function(story) {
                return <li key={ story.id }><Link to={ '/story/' + story.id }><img src={ INDEX + story.image_url } /></Link></li>
            }) : null;

        case 'most-commented':
            return mostCommentedStories ? mostCommentedStories.map(function(story) {
                return <li key={ story.id }><Link to={ '/story/' + story.id }><img src={ INDEX + story.image_url } /></Link></li>
            }) : null;
        }
    }
    setTab = (tab) => {
        this.setState({ tab: tab });
    }
    addStory = () => {
        let hoop = this.state.hoop;

        if (hoop)
            Dispatcher.dispatch({ type: 'overlay', name: 'add-story', data: { hoopID: hoop.id } });
    }
}

module.exports = Hoop;
