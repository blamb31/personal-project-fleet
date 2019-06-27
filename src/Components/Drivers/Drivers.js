import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getDrivers} from '../../redux/reducers/drivers'


class Drivers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driver_first_name: null, 
            driver_last_name: '', 
            car_id: null,
            driver_phone: '', 
            driver_img: '', 
        }
    }

    componentDidMount = async () => {
        await this.props.getDrivers()
    }
    
    handleChange(event){
        let {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleAddCar = () => {
        for( let key in this.state) {
            if(!this.state[key]){
                return alert('Please fill in all fields')
            }
        }
        this.props.addCar(this.state)
        this.setState({
            driver_first_name: 0, 
            driver_last_name: '', 
            car_id: 0,
            driver_phone: '', 
            driver_img: '',
        })
    }
    
    render() {
        let {drivers} = this.props
        let driver;
        console.log(this.props)
        if(this.props.user){
            driver = drivers.sort((a, b) => {
                if(a.driver_first_name.toLowerCase() < b.driver_first_name.toLowerCase()){
                    return -1
                }
                if (a.driver_first_name.toLowerCase() > b.driver_first_name.toLowerCase()) {
                    return 1
                }
            }).map((driver, index) => {
                if(index % 2 === 0){
                    return(
                        <tr style={{background:'white'}} key={index}>
                            <td>{index + 1}</td>
                            <td>{driver.driver_id}</td>
                            <td><Link to={`/user/admin/api/drivers/${driver.driver_id}`}>{`${driver.driver_first_name} ${driver.driver_last_name}`}</Link></td>
                            <Link to={`/user/admin/api/cars/${driver.car_id}`}><td>{`${driver.car_year} ${driver.car_make} ${driver.car_model} (${driver.car_color})`}</td></Link>
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'gray'}} key={index}>
                            <td>{index + 1}</td>
                            <td>{driver.driver_id}</td>
                            <td><Link to={`/user/admin/api/drivers/${driver.driver_id}`}>{`${driver.driver_first_name} ${driver.driver_last_name}`}</Link></td>
                            <Link to={`/user/admin/api/cars/${driver.car_id}`}><td>{`${driver.car_year} ${driver.car_make} ${driver.car_model} (${driver.car_color})`}</td></Link>
                        </tr>
                    )
                }
            })
        }
        return(
            <div>
                <div>
                    <div>
                        <p>Car ID:</p>
                        <input 
                        type='number' 
                        placeholder='Car ID' 
                        value={this.state.car_id} 
                        name='car_id' 
                        onChange={event => this.handleChange(event)} />
                    </div>
                    <div>
                        <input 
                        type='text' 
                        placeholder='First Name' 
                        value={this.state.driver_first_name} 
                        name='driver_first_name' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Last Name' 
                        value={this.state.driver_last_name} 
                        name='driver_last_name' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Phone Number' 
                        value={this.state.driver_phone} 
                        name='driver_phone' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Picture' 
                        value={this.state.driver_img} 
                        name='driver_img' 
                        onChange={event => this.handleChange(event)} />
                    </div>
                </div>
                {(this.props.user) ?
                    <div>
                        <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                            <h3>Drivers In The Fleet</h3>
                            <table>
                                <tr style={{background: 'gray'}}>
                                    <th></th>
                                    <th>Driver ID</th>
                                    <th>Driver Name</th>
                                    <th>Car Information</th>
                                </tr>
                                {driver}
                            </table>
                        </div>
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
        drivers: state.drivers.data
    }
}

export default connect(mapStateToProps, {getDrivers})(Drivers)