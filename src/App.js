import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Components/Login/Login'


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path='/' component={Login}/>
          {/* <Route path='/' component={Login}/> */}
        </Switch>

      </Router>
    </div>
  );
}

export default App;
