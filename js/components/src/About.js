'use strict'

import React from 'react';

const NUM_SLIDES = 3;

class About extends React.Component {
	render() {
		return (
				<div id="about">
					<div className=".col-xs-12 .col-sm-12 col-md-12 ">
            <h2>About</h2>
          </div>
					<div className=".col-xs-12 .col-sm-12 col-md-6 ">
            <p>Pinoy Hoops is a collaboration between BBH Asia-Pacific and Mike Swift—rapper, baller, and founder of <a href="#"> @pinoyhoops</a>, one of most influential Instagram accounts in the Pinoy basketball. It exists to document the millions of hoops found in every corner of the Philippines, and showcase the countrys mad, maniacal, and magical love of the game.</p>
						<p>Donate sneaks, gear, and others to the kids who rule these courts.</p>
        	</div>
					<div className="col-md-12 "></div>
					<div className=".col-xs-12 .col-sm-12 col-md-12 ">
						<a href="#" className="button">Donate</a>
					</div>
				</div>
		)
	}
	state = {
		slideIndex: 0,
	}
	componentDidMount() {
		let hammertime = new Hammer(this.refs.csslider);
		let slideIndex = this.state.slideIndex;

		hammertime.on('swipe', function(event) {
			let prevSlideIndex = slideIndex;
			let prevSlide = document.getElementById('slides_' + (prevSlideIndex + 1));
			
			prevSlide.checked = false;

			if (event.overallVelocity > 0)
				slideIndex = (slideIndex - 1) >= 0 ? slideIndex - 1 : NUM_SLIDES - 1;
			else
				slideIndex = (slideIndex + 1) % NUM_SLIDES;

			let slide = document.getElementById('slides_' + (slideIndex + 1));

			slide.checked = true;
		});
	}
}

module.exports = About;
