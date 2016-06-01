'use strict'

import $ from 'jquery'
import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {
	render() {
		return (
			<section className='landingpage'>
				<div id='slideshow'>
				   <div>
					   <img src="/images/landingpage/hero01.jpg" />
				   </div>
				   <div>
					   <img src="/images/landingpage/hero02.jpg" />
				   </div>
				   <div>
					   <img src="/images/landingpage/hero03.jpg" />
				   </div>
				</div>

				<div className='logo'>
					<Link to='/'><img src='/images/logo_light.png' className='img-responsive' /></Link>
				</div>

				<div className='nav-arrow'>
					<Link to='/map'><img src='/images/landingpage/arrow.png' /></Link>
				</div>
			</section>
		)
	}
	componentDidMount() {
		$("#slideshow > div:gt(0)").hide();

		this.intervalID = setInterval(function() {
			$('#slideshow > div:first')
				.fadeOut(1000)
				.next()
				.fadeIn(1000)
				.end()
				.appendTo('#slideshow');
		}, 5000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
}

module.exports = Home;
