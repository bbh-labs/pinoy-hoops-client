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

		let featuredStories = hoop.data.featured_stories;
		let hoopImageURL = featuredStories.hoop ? featuredStories.hoop.image_url : null;
		let courtImageURL = featuredStories.court ? featuredStories.court.image_url : null;
		let crewImageURL = featuredStories.crew ? featuredStories.crew.image_url : null;

		let shareURL = BASE_URL + '/hoop/' + hoop.id;

		return (
			<div id="story">
				<div className="row">
					<div className="heroimage">
						<HeroImageItem imageURL={ hoopImageURL } left={ true } />
						<HeroImageItem imageURL={ courtImageURL } left={ false } />
						<HeroImageItem imageURL={ crewImageURL } left={ true } />
					</div>
					<div className="title">
						<h1>{ hoop.name }</h1>
						<div className="social">
							<a href="#" onClick={ this.like } ><img src="/images/icon_like.png"/></a>
							<Link to="/hoop/comment"><img src="/images/icon_comment.png"/></Link>
								<div className="networks">
									<a href={ 'http://www.facebook.com/sharer.php?u=' + shareURL } target='_blank'><img src="/images/facebook.png"/></a>
									<a href={ 'https://twitter.com/share?url=' + shareURL } target='_blank'><img src="/images/twitter.png"/></a>
								</div>
						</div>
					</div>
					<div className="desciption">
						<div className=".col-xs-6.col-sm-6 col-md-6 nopadding"></div>
						<div className=".col-xs-6.col-sm-6 col-md-6 nopadding">
							<h3>{ hoop.description }</h3>
						</div>
					</div>

					<div className="gallery">
						<form ref='storyForm' className=".col-xs-4.col-sm-3 col-md-2 nopadding">
							<label htmlFor='uploadhoop' className='uploadhoop file-label'>
								<input id='uploadhoop' type='file' name='image' accept='image/*' onChange={ this.submit } />
								<img src="/images/upload.jpg"/>
							</label>
							<input type='hidden' name='hoop_id' value={ hoop.id } />
						</form>
						{
							latestStories ? latestStories.map(function(story) {
								return <Story story={ story } />;
							}) : null
						}
					</div>
				</div>
			</div>
		)
	}
	state = {
		hoop: null,
		latestStories: null,
		tab: 'most-recent',
		liked: false,
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
	like = () => {
		let hoopID = this.props.params.hoopID;

		API.likeHoop({ hoopID: hoopID }, () => {
			console.log('liked hoop');
		}, () => {
			console.log('failed to like hoop');
		});
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

		API.hasLikedHoop({ hoopID: hoopID }, (liked) => {
			this.setState({ liked: liked });
		}, () => {
			console.log('Failed to get my hoop like');
		});
	}
	submit = (event) => {
		API.addStory(new FormData(this.refs.storyForm), () => {
			this.fetchData();
			alert('Successfully added story!');
		}, () => {
			alert('Failed to add story!');
		});
	}
}

class HeroImageItem extends React.Component {
	render() {
		let imageURL = this.props.imageURL;

		if (!imageURL)
			return null;

		return (
			<div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
				<div className={ this.props.left ? "left" : "right" }>
					<img src={ contentURL(imageURL) } />
				</div>
			</div>
		)
	}
}

class Story extends React.Component {
	render() {
		let story = this.props.story;

		if (!story)
			return null;

		return (
			<div className=".col-xs-4.col-sm-3 col-md-2 nopadding">
				<img src={ contentURL(story.image_url) } />
			</div>
		)
	}
}

module.exports = Hoop;
