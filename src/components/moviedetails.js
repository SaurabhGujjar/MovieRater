import React, {useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';


function MovieDetails(props){
    let mov = props.movie;
    const [ highlighted, setHighlighted ] = useState(-1);
    const [token] = useCookies(['mr-token']);


    const highlightRate = high => evt => {
        setHighlighted(high);
    }

    const getDetails = () => {
        fetch(`https://movieraterapi01.herokuapp.com/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token['mr-token']}`
            } 
      
          }).then(response => response.json())
          .then(response => props.updateMovie(response))
          .catch(err => console.log(err))
    }

    const rateClicked = rate => evt =>{
      fetch(`https://movieraterapi01.herokuapp.com/movies/${mov.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      },
      body: JSON.stringify({stars: rate + 1})

    }).then( () => getDetails())
    .catch(err => console.log(err))
    }


 
    return (
        <div>
            { mov ? (
                <div>
                    <h1>{mov.title}</h1>
                    <p>{mov.description}</p>
                    <FontAwesomeIcon icon={faStar}  className={mov.avg_rating>0? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating>1? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating>2? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating>3? 'orange': ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating>4? 'orange': ''}/>
                    ({mov.no_of_ratings})
                    <div className="rate-container">
                        <h2>Rate it</h2>
                        {
                            [...Array(5)].map((e,i)=>{
                                return <FontAwesomeIcon key={i} icon={faStar} className={highlighted> (i-1) ? 'purple': ''}
                                onMouseEnter={highlightRate(i)}
                                onMouseLeave={highlightRate(-1)}
                                onClick={rateClicked(i)}/>
                            })
                        }
                    </div>

                </div>
            ) : null }
            

          </div>
    )
}


export default MovieDetails;