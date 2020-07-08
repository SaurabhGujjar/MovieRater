export class API {
    static loginUser(body) {
        return  fetch(`https://movieraterapi01.herokuapp.com/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify(body)

          }).then( response => response.json() )
          .then( console.log('Login Successfully!'))
    }

    static registerUser(body) {
        return  fetch(`https://movieraterapi01.herokuapp.com/users/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify(body)

          }).then( response => response.json() )
          .then( console.log('Registered Successfully!'))
    }

    static updateMovie(mov, body, token) {
        
        return  fetch(`https://movieraterapi01.herokuapp.com/movies/${ mov.id }/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)

          }).then( response => response.json() )
          .then( console.log('Updated Successfully!'))
    }

    static createMovie(body, token) {
        
        return  fetch(`https://movieraterapi01.herokuapp.com/movies/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)

          }).then( response => response.json() )
          .then( console.log('Created Successfully!'))
    }

    static deleteMovie(mov, token) {
        
        return  fetch(`https://movieraterapi01.herokuapp.com/movies/${mov.id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
            

          })
          .then( console.log('Deleted Successfully!'))
    }
    
}