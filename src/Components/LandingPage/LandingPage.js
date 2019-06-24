import React from 'react'
import {Link} from 'react-router-dom'

export default function LandingPage(props){
    return(
        <div>
            <h1>WELCOME TO MY PERSONAL PROJECT!</h1>
            <Link to='/auth/login'><button>Login</button></Link>
            <Link to='/auth/register'><button>Register</button></Link>
        </div>
    )
}