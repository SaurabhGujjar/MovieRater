import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movielist';
import MovieDetails from './components/moviedetails';
import MovieForm from './components/movieForm';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'




function App() {
  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);


  useEffect(()=>{
    fetch("https://movieraterapi01.herokuapp.com/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }

    }).then(response => response.json())
    .then(response => setMovies(response))
    .catch(err => console.log(err))
  }, [])

  useEffect( () => {
    console.log(token);
    console.log(setToken);
    if (!token['mr-token']) { window.location.href = '/'; }
  }, [token] )

 

    const loadMovie = movie => {
      setSelectedMovie(movie);
      setEditedMovie(null);
    }
    const editClicked = movie => {
      setEditedMovie(movie);
      setSelectedMovie(null);
    }

    const updatedMovie = movie => {
      const newMovie = movies.map( mov => {
        if (mov.id === movie.id){
          return movie;
        }
        return mov;
      })
      setMovies(newMovie);
    }


    const newMovie = () => {
      setEditedMovie({title: '', description: ''});
      setSelectedMovie(null);
    }


    const movieCreated = movie => {
      const newMovies = [...movies, movie];
      setMovies(newMovies);
      
    }

    const deleteClicked = movie => {
      const newMovies = movies.filter( mov => mov.id !== movie.id)
        setMovies(newMovies);
    }

    const logoutUser = () => {
      deleteToken(['mr-token'])
    }


    return (
      <div className="App">
          <header className="App-header">
          
          <h1> <FontAwesomeIcon icon={faFilm}  />
          <span>Movie Rater</span>
          </h1>
          <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}  />
          </header>
          
          <div className="layout">
          <div>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} deleteClicked={deleteClicked}/>
          <button onClick={newMovie}>Add Movie</button>
          </div>
          { editedMovie ? (<MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/>) : null }
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          
          </div>
      </div>
    );
}

export default App;
