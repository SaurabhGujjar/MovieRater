import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Auth from './components/auth';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';



function Router() {

 

  return (
    <CookiesProvider>
    <BrowserRouter>
    <Route exact path="/" component={Auth} />
    <Route exact path="/movies" component={App} />
    </BrowserRouter>
    </CookiesProvider>
  )

}


ReactDOM.render(
  <Router />, document.getElementById('root'));
