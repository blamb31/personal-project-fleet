import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Components/Login/Login'
import CreateAccount from './Components/CreateAccount/CreateAccount'
import LandingPage from './Components/LandingPage/LandingPage'
import User from './Components/User/User'
import UserInfo from './Components/UserInfo/UserInfo'
import EditUserInfo from './Components/EditUserInfo/EditUserInfo'
import Stripe from './Components/Stripe/Stripe'
import S3Bucket from './Components/S3Bucket/S3Bucket'
import Drivers from './Components/Drivers/Drivers'





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
          <Route path='/userInfo' exact component={UserInfo} />
          <Route path='/userInfo/edit/:id' exact component={EditUserInfo} />
          <Route path='/api/payment' exact component={Stripe} />
          <Route pats3h='/api/s3' exact component={S3Bucket} />    
          <Route path='/user/admin/api/drivers' exact component={Drivers} />
      

        </Switch>
       
      </Router>
    </div>
  );
}

export default App;
