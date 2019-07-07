import React from 'react'
import {Switch, Route} from 'react-router-dom'

import './user.css'

import Admin from '../Admin/Admin'

export default function User(props){
    return(
        <div className='usersDiv'>
            <Admin />

        </div>
    )
}