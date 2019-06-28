import React from 'react'

import {Route, Switch} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Cars from '../Cars/Cars'
import CreateDriver from '../CreateDriver/CreateDriver'
import CreateCar from '../CreateCar/CreateCar'

import Maintenance from '../Maintenance/Maintenance'
import Car from '../Car/Car'
import EditCar from '../EditCar/EditCar'
import Driver from '../Driver/Driver'
import EditDriver from '../EditDriver/EditDriver'
import UserInfo from '../UserInfo/UserInfo'


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
                        <Route path='/user/admin/api/createDriver' exact component={CreateDriver} />
                        <Route path='/user/admin/api/maintenance' component={Maintenance} />
                        <Route path='/user/admin/api/cars/:id' exact component={Car} />
                        <Route path='/user/admin/api/cars/edit/:id' exact component={EditCar} />
                        <Route path='/user/admin/api/drivers/edit/:id' exact component={EditDriver} />                        
                        <Route path='/user/admin/api/drivers/:id' exact component={Driver} />
                        <Route path='/user/admin/api/createCar' exact component={CreateCar} />
                        
                    </Switch>
                </div>

                :
                
                <div>
                    <NavBar />
                    <Switch>
                        <Route path='/user/admin/api/cars' exact component={Cars} />
                        <Route path='/user/admin/api/createDriver' exact component={CreateDriver} />
                        <Route path='/user/admin/api/maintenance' component={Maintenance} />
                        <Route path='/user/admin/api/cars/:id' exact component={Car} />
                        <Route path='/user/admin/api/cars/edit/:id' exact component={EditCar} />
                        <Route path='/user/admin/api/drivers/edit/:id' exact component={EditDriver} />                        
                        <Route path='/user/admin/api/drivers/:id' exact component={Driver} />
                        <Route path='/user/admin/api/createCar' exact component={CreateCar} />
                        
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

