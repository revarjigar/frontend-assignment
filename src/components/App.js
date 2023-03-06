import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Modal from './Modal.js';

export default function App() {
  const [photos, setPhotos] = useState();
	const [modal, setModal] = useState();
	const inputRef = React.useRef(null);
  const io = useRef(null);
	const movieUrl = `${process.env.REACT_APP_API_DOMAIN}/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`;

	async function searchAPI(event) {
		if (event.key === 'Enter') {
			let query = inputRef.current.value;
			query = query.split(' ').join('+');
			const searchUrl = `${process.env.REACT_APP_API_DOMAIN}/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1&query=${query}`;
			getAPI(searchUrl);
    }
	}
	async function getAPI(url) {
		const response = await fetch(url);
		const jsonData = await response.json();
		jsonData.results.forEach((eachJSONData, i) => {
			// eachJSONData.backdrop_path = `${process.env.REACT_APP_API_BASE_IMAGE_URL}/${eachJSONData.backdrop_path}`;
			// eachJSONData.poster_path = `${process.env.REACT_APP_API_BASE_IMAGE_URL}/${eachJSONData.poster_path}`;
		});
		setPhotos(jsonData.results);
	}

	function openModal(index) {
		const test = photos[index];
		setModal(test);
	}

  useEffect(() => {
    getAPI(movieUrl);
  }, []);

  return (
		<>
			<div className='header'>
				<div className='submit'>
				  <input className='submit' type='search' placeholder='Search for a movie' ref={inputRef} onKeyDown={searchAPI}/>
				</div>
			</div>
		  <div>
		    <ul>
					{photos ? (
						photos.map((photo, index) =>
							<li key={photo.id}>
								<a href="#modal" className='container' onClick={() => openModal(index)} >
									<span className='rating'>{photo.vote_average}</span>
									<img className='img' src={process.env.REACT_APP_API_BASE_IMAGE_URL+'/'+photo.poster_path} height='500' />
									<span className='title'>{photo.title}</span>
								</a>
							</li>
						)
						) : (
						<h1>loading</h1>
					)}
		    </ul>
		  </div>
			<Modal {...modal} />
		</>
  );
}
