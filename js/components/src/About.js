'use strict'

import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className='site-wrap'>
                <div className='about'>
                    <div className='csslider'>
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
}

module.exports = About;
