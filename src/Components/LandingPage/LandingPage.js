import React from 'react'
import {Link} from 'react-router-dom'
import './landingPage.css'

export default function LandingPage(props){
    return(
        <div className='landingPage'>
            <div className='lpContent'>
                <h1 id='landingWelcome'>Welcome To fleetnanny</h1>
                <h3 id='landingPlease'>Please log in or create an account</h3>
            </div>
            <div className='lpLinks'>
                <Link className='lpLink' to='/auth/login'><button className='lpButton'>Login</button></Link>
                <Link className='lpLink' to='/auth/register'><button className='lpButton'>Register</button></Link>
            </div>
        </div>
    )
}