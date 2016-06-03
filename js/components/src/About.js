'use strict'

import React from 'react';

const NUM_SLIDES = 3;

class About extends React.Component {
	render() {
		return (
			<div className='site-wrap'>
				<div className='about'>
					<div className='csslider' ref='csslider'>
						<input type='radio' name='slides' id='slides_1' defaultChecked />
						<input type='radio' name='slides' id='slides_2' />
						<input type='radio' name='slides' id='slides_3' />
						<input type='radio' name='slides' id='slides_4' />
						<input type='radio' name='slides' id='slides_N' />
						<ul>
							<li>
								<img src='images/about01.jpg' />
								<h3>About<br/> Pinoy Hoop</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor mi, ultrices eu vulputate eu, bibendum et ipsum. In sed sollicitudin mi,</p>
							</li>
							<li>
								<img src='images/about02.jpg' />
							</li>
							<li>
								<img src='images/about03.jpg' />
							</li>
						</ul>
						<div className='dots'>
							<div>
								<label htmlFor='slides_1'></label>
								<label htmlFor='slides_2'></label>
								<label htmlFor='slides_3'></label>
							</div>
						</div>
					</div>
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
