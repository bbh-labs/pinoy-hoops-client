'use strict'

import React from 'react';
import { Link } from 'react-router';

import API from './API'
import Dispatcher from './Dispatcher'

class Hoop extends React.Component {
	render() {
		let hoop = this.state.hoop;
		let latestStories = this.state.latestStories;
		let tab = this.state.tab;

		if (!hoop)
			return null;

		return (
			<div id="story">
				<div className="row">
					<div className="heroimage">
						<div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
							<div className="left">
								<img src={ contentURL(hoop.data.featured_story.image_url) } />
							</div>
						</div>
						<div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
							<div className="right">
								<img src={ contentURL(hoop.data.featured_story.image_url) } />
							</div>
						</div>
						<div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
							<div className="left">
								<img src={ contentURL(hoop.data.featured_story.image_url) } />
							</div>
						</div>
					</div>
					<div className="title">
						<img src="/images/hoop_frame.png"/>
						<h3>Hoop Name</h3>
						<div className="social">
							<a href="#"><img src="/images/icon_share.png"/></a>
							<a href="#"><img src="/images/icon_like.png"/></a>
							<a href="#"><img src="/images/icon_comment.png"/></a>
						</div>
					</div>
					<div className="desciption">
						<div className=".col-xs-6.col-sm-6 col-md-6 nopadding"></div>
						<div className=".col-xs-6.col-sm-6 col-md-6 nopadding">
							<h3>"{ hoop.description }</h3>
						</div>
					</div>

					<div className="gallery">
						<div className=".col-xs-4.col-sm-4 col-md-4 nopadding">
							<div className="uploadhoop">
								<a href="#"><img src="/images/uploadimage.jpg"/></a>
							</div>
						</div>
						<div className=".col-xs-4.col-sm-4 col-md-4 nopadding">
							<img src="/images/image1.jpg"/>
						</div>
						<div className=".col-xs-4.col-sm-4 col-md-4 nopadding">
							<img src="/images/image1.jpg"/>
						</div>
						<div className=".col-xs-4.col-sm-4 col-md-4 nopadding">
							<img src="/images/image1.jpg"/>
						</div>
						<div className=".col-xs-4.col-sm-4 col-md-4 nopadding">
							<img src="/images/image1.jpg"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
	state = {
		hoop: null,
		latestStories: null,
		tab: 'most-recent',
	}
	componentDidMount() {
		this.fetchData();

		this.dispatcherID = Dispatcher.register((payload) => {
			switch (payload.type) {
			case 'refresh-hoop':
				this.fetchData();
				break;
			}
		});
	}
	componentWillUnmount() {
		Dispatcher.unregister(this.dispatcherID);
	}
	stories = () => {
		let latestStories = this.state.latestStories;

		switch (this.state.tab) {
		case 'most-recent':
			return latestStories ? latestStories.map(function(story) {
				return <li key={ story.id }><Link to={ '/story/' + story.id }><img src={ contentURL(story.image_url) } /></Link></li>
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
	share = () => {
		let hoop = this.state.hoop;

		if (hoop)
			Dispatcher.dispatch({ type: 'overlay', name: 'share-hoop', data: { hoopID: hoop.id } });
	}
	fetchData = () => {
		let hoopID = this.props.params.hoopID;

		API.getHoop({ hoopID: hoopID }, (hoop) => {
			this.setState({ hoop: hoop });
		}, (response) => {
			alert('Failed to get hoop');
		});

		API.getLatestStories({ hoop_id: hoopID }, (stories) => {
			this.setState({ latestStories: stories });
		}, (response) => {
			alert('Failed to get latest stories');
		});
	}
}

module.exports = Hoop;
