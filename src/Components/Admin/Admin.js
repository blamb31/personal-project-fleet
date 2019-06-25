import React from 'react'

import {Route, Switch} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Cars from '../Cars/Cars'

export default function Admin(){
    return(
        <div>
            ADMIN PAGE
            <NavBar />
            <Switch>
                <Route path='/user/admin/api/cars' component={Cars} />
            </Switch>
        </div>
    )
}