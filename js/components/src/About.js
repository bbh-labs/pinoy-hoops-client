'use strict'

import React from 'react';

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
}

module.exports = About;
