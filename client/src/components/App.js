import React from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import '../App.css';
import Auth from '../hoc/Auth';

function App() {
  return (
    <Router>
      <NavBar/>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
