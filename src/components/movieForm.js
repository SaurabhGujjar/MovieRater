import React, { useState ,useEffect } from 'react';
import { API } from '../apiService';
import { useCookies } from 'react-cookie';


function MovieForm(props){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [token] = useCookies(['mr-token']);

    useEffect( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    }, [props.movie])


    const updateClicked = () => {
        API.updateMovie(props.movie, {title: title, description: description}, token['mr-token'] )
        .then( response => props.updatedMovie(response) )
        .catch( err => console.log(err))
    }
    const createClicked = () => {
        API.createMovie( {title: title, description: description}, token['mr-token'] )
        .then( response => props.movieCreated(response) )
        .catch( err => console.log(err))
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return(
        <React.Fragment>
            { props.movie ? (
                <div>
                <label htmlFor="title">Title</label> <br />
                <input id="title" type="text" placeholder="Title" value={title} onChange={ evt => setTitle(evt.target.value)} /><br />
                <label htmlFor="description">Description</label><br />
                <textarea id="description" type="text" placeholder="Description" value={description} onChange={evt => setDescription(evt.target.value)} /><br />
                { props.movie.id ? (<button onClick={ updateClicked } disabled={isDisabled}>Update</button>) : (<button onClick={ createClicked } disabled={isDisabled}>Create</button>) }
                </div>
            
            ) : null }
        
        </React.Fragment>
    )
}

export default MovieForm;