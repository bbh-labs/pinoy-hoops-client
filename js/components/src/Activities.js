'use strict'

import React from 'react';
import { Link } from 'react-router';

import API from './API';

const ACTIVITY_POST_HOOP		  = 1,
	  ACTIVITY_POST_STORY		 = 2,
	  ACTIVITY_POST_COMMENT_HOOP  = 101,
	  ACTIVITY_POST_COMMENT_STORY = 102,
	  ACTIVITY_POST_LIKE_HOOP	 = 201,
	  ACTIVITY_POST_LIKE_STORY	= 202;

class Activities extends React.Component {
	render() {
		let activities = this.state.activities;

		return (
			<div className='site-wrap'>
				 <div className='activities'>
					<ul>
						{ this.activities() }
					</ul>
				 </div>
			</div>
		)
	}
	state = {
		activities: null,
	}
	componentDidMount() {
		this.getActivities();
	}
	getActivities = () => {
		API.getActivities((activities) => {
			this.setState({ activities: activities });
		}, (response) => {
			alert('Failed to get activities');
		});
	}
	activities() {
		let activities = this.state.activities;
		if (!activities)
			return null;

		return activities.map(function(activity, i) {
			return <Activity key={ i } activity={ activity } />
		});
	}
}

class Activity extends React.Component {
	render() {
		let activity = this.props.activity;
		let user = activity.data.user;
		let story = activity.data.story;
		let hoop = activity.data.hoop;
		
		return (
			<li>
				<div className='userprofile'>
					<span className='left'><img src={ user.image_url } /></span>
				</div>
				<div className='userfeeds'>
					<p>{ user.firstname } { user.lastname } { this.action() } </p>
				</div>
				<div className='userstory'>
					{
						story ? <span className='right'><Link to={ '/story/' + story.id }><img src={ story.image_url } /></Link></span> :
						hoop ?  <span className='right'><Link to={ '/hoop/' + hoop.id }><img src={ hoop.data.featured_story.image_url } /></Link></span> : null
					}
				</div>
			</li>
		)
	}
	action() {
		let activity = this.props.activity;
		let hoop = activity.data.hoop;
		let story = activity.data.story;

		switch (activity.type) {
		case ACTIVITY_POST_HOOP:
			return 'posted hoop \'' + hoop.name + '\'';

		case ACTIVITY_POST_STORY:
			return 'posted story \'' + story.name + '\'';

		case ACTIVITY_POST_COMMENT_HOOP:
			return 'posted comment on \'' + hoop.name + '\'';

		case ACTIVITY_POST_COMMENT_STORY:
			return 'posted comment on \'' + story.name + '\'';

		case ACTIVITY_POST_LIKE_HOOP:
			return 'liked hoop \'' + hoop.name + '\'';

		case ACTIVITY_POST_LIKE_STORY:
			return 'liked story \'' + story.name + '\'';
		}
	}
}

module.exports = Activities;
