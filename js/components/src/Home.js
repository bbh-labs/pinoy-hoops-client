'use strict'

import $ from 'jquery'
import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {
	render() {
		return (
			<section id="landingpage">
		    <div className="container-fluid">
		    <div className="row">
		        <div className=".col-xs-12 .col-sm-12 col-md-12 nopadding">
		          <div className="logo">
		            <img src="images/logo_light.png"/>
		          </div>
		          <div className="fadein">
		            <div className='background-1' />
		            <div className='background-2' />
		            <div className='background-3' />
		            <div className='background-4' />
		            <div className='background-5' />
		            <div className='background-6' />
		            <div className='background-7' />
		            <div className='background-8' />
		          </div>
		          <Link to='/map'>
		            <div className="arrow bounce">
		            </div>
		          </Link>
		        </div>
		    </div>
		    </div>
		  </section>
		)
	}
	componentDidMount(){
		$(() => {
			$('.fadein div:gt(0)').hide();

			this.intervalID = setInterval(function(){
				$('.fadein :first-child')
					.fadeOut()
					.next('div')
					.fadeIn()
					.end()
					.appendTo('.fadein');
			}, 5000);
		});
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
}

module.exports = Home;
