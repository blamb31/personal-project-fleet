import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Components/Login/Login'
import CreateAccount from './Components/CreateAccount/CreateAccount'
import LandingPage from './Components/LandingPage/LandingPage'
import User from './Components/User/User'



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/auth/login' exact component={Login}/>
          <Route path='/auth/register' component={CreateAccount}/>
          <Route path='/user/admin' component={User}/>

        </Switch>
       
      </Router>
    </div>
  );
}

export default App;
