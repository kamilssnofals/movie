import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './assets/file.svg';
import MovieCard from './MovieCard';

const App = () => {
	const API_URL = 'http://www.omdbapi.com?apikey=b6003d8a';

	const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState('')

  const searchMovies = async title => {
    try {
      const res = await axios.get(`${API_URL}&s=${title}`)
      console.log(res.data.Search);
      setMovies(res.data.Search);
    } catch (error) {
      console.log(error);
    }
  }

	useEffect(() => {
		searchMovies('Spiderman');
	}, []);




  const searchEnter = e => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm)
    }
  }


	return (
		<div className='app'>
			<h1>MovieLand</h1>
			<div className='search'>
				<input
					type='text'
					placeholder='Search for movies'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					onKeyDown={searchEnter}
				/>
				<img
					src={searchIcon}
					alt='superman'
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className='container'>
					{movies.map(movie => (
						<MovieCard movie={movie} key={movie.imdbID} />
					))}
				</div>
			) : (
				<div className='empty'>
					<h2>No Movies Found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
