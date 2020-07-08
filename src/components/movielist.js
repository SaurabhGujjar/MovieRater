import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from '../apiService';
import { useCookies } from 'react-cookie';


function MovieList(props){

    const [token] = useCookies(['mr-token']);

    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }
    const editClicked = movie => {
        props.editClicked(movie);  
    }

    const deleteClicked = movie => {
        API.deleteMovie(movie, token['mr-token']).then( () => props.deleteClicked(movie))
        .catch(err => console.log(err))
        
    }

 
    return (
        <div>
            { props.movies && props.movies.map( movie => {
              return (
                  <div key={movie.id} className="movie-item">
                      <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
                      <FontAwesomeIcon icon={faEdit} onClick={()=> editClicked(movie)} />
                      <FontAwesomeIcon icon={faTrash}  onClick={()=> deleteClicked(movie)}/>

                  </div>
              )
            }) }
            
          </div>
    )
}


export default MovieList;