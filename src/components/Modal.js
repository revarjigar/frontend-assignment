import close from '../images/close-icon.svg';
import React, { useState, useEffect, useRef } from 'react';
import './Modal.css';

export default function Modal(props) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const release = new Date(props.release_date);
  const releaseMonth = months[release.getMonth()];

  return (
		<div id='modal' className='modal'>
		    <div className='modal__content'>
	        <span className='modal__title'>{props.title}</span>
	        <div className='modal__content__inner'>
            <img className='img' src={process.env.REACT_APP_API_BASE_IMAGE_URL+'/'+props.poster_path} height='400' />
            <div className='modal__content__movie'>
              <span className='date'><span className='date__header'>Release date:</span> {releaseMonth} {release.getUTCDate()}, {release.getFullYear()}</span>
              <span className='overview'>{props.overview}</span>
              <span className='vote'><span className='vote__header'>{props.vote_average}</span>/10 ({props.vote_count} total votes)</span>
            </div>
	        </div>
	        <a href='#123' className='modal__close'><img src={close} alt="My Happy SVG"/></a>
		    </div>
	  </div>
  );
}
