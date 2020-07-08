import React, { useState,useEffect } from 'react';
import {API} from '../apiService';
import { useCookies } from 'react-cookie';

function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies(['mr-token']);
    useEffect( () => {
        
        if (token['mr-token']) { window.location.href = '/movies'; }
    }, [token] ) 

    const loginClicked = () => {
        API.loginUser({username: username, password: password})
        .then( resp => setToken('mr-token', resp.token))
        .catch(err => console.log(err))
    }

    const setLoginView = () => {
        setIsLoginView(false);
    }

    const setLoginViewRev = () => {
        setIsLoginView(true);
    }

    const registerClicked = () => {
        
        API.registerUser({username: username, password: password})
        .then( () => loginClicked() )
        .catch(err => console.log(err))
    }

    const isDisabled = username.length === 0 || password.length === 0;

    return (
                <div className="App">
                    <header className="App-header">
                    {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
                </header>
                <div className="login-container">
                
                <label htmlFor="username">Username</label> <br />
                <input id="username" type="text" placeholder="User Name" value={username} onChange={ evt => setUsername(evt.target.value)} /><br />
                <label htmlFor="password">Password</label><br />
                <input id="password" type="password" placeholder="Password" value={password} onChange={evt => setPassword(evt.target.value)} /><br />
                {isLoginView ? <button onClick={ loginClicked } disabled={isDisabled}>Login</button> : <button onClick={ registerClicked } disabled={isDisabled}>Register</button>}
                
                { isLoginView ? <p onClick={setLoginView}>You don't have an account? <span>Register here!</span></p> : <p onClick={setLoginViewRev}>You already have an account? <span>Login here!</span></p> }
                
                </div>
                </div>
    )
}

export default Auth;