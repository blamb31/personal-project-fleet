import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import {getDriver, deleteDriver} from '../../redux/reducers/drivers'

import './driver.css'

class Driver extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getDriver(this.props.match.params.id)
    }

    handleChange(event){
        let {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleDeleteDriver = async (id) => {
        await this.props.deleteDriver(id)
        this.props.history.push('/user/admin/api/cars')
    }

    render(){
        let {driver} = this.props
        return(
            <div className='outerDriverDiv'>
                 {this.props.user ?
                <div className='innerDriverDiv'>
                    {this.props.driver &&
                    <div className='DriverDiv'>
                        <div className='driverDivDriverInfo'>
                            <h1>{`${driver.driver_id} - ${driver.driver_first_name} ${driver.driver_last_name}`}</h1>
                            <img className='driverDivImg' src={driver.driver_img} />
                            <h3>{`Phone Number: ${driver.driver_phone}`}</h3>
                        </div>
                    
                        <div className='driverDivButtons'>
                            <button className='driverDivButton' onClick={ () => window.history.back()} >Back</button>
                            <button className='driverDivButton' onClick={ () => this.props.history.push(`/user/admin/api/drivers/edit/${this.props.match.params.id}`)} >Edit</button>
                            <button className='driverDivButton' onClick={() => this.handleDeleteDriver(this.props.match.params.id)} >{`Delete ${driver.driver_first_name}`}</button>
                        </div>
                    </div>
                    }
                </div>
                :
                    <Redirect to='/' />
                 }
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.users.data,
        driver: state.drivers.selected
    }
}

export default connect(mapStateToProps, {getDriver, deleteDriver})(Driver)