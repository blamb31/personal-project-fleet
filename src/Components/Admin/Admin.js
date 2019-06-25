import React from 'react'

import {Route, Switch} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Cars from '../Cars/Cars'
import Drivers from '../Drivers/Drivers'
import Maintenance from '../Maintenance/Maintenance'

import {connect} from 'react-redux'

function Admin(props){
    return(
        <div>
            {props.user ?
                <div>
                    <h1>{`${props.user.admin_company_name}'s Fleet`}</h1>
                    <NavBar />
                    <Switch>
                        <Route path='/user/admin/api/cars' exact component={Cars} />
                        <Route path='/user/admin/api/drivers' exact component={Drivers} />
                        <Route path='/user/admin/api/maintenance' component={Maintenance} />
                    </Switch>
                </div>

                :
                <div>
                    <NavBar />
                    <Switch>
                        <Route path='/user/admin/api/cars' exact component={Cars} />
                        <Route path='/user/admin/api/drivers' exact component={Drivers} />
                        <Route path='/user/admin/api/maintenance' component={Maintenance} />
                    </Switch>
                </div>            
            }
        </div>
    )
}

let mapStateToProps = state => {
    return {
        user: state.users.data
    }
}

export default connect(mapStateToProps)(Admin)

