import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getCars} from '../../redux/reducers/cars'

import './maintenance.css'


class Maintenance extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = async() => {
        await this.props.getCars()

    }

    render() {

        let {cars} = this.props
        let car;
        if(this.props.user){
            car = cars.filter( car => {
                return car.car_mileage - car.last_oil_change >= 5000
            }).sort((a, b) => {
                return ((Number(b.car_mileage) -Number(b.last_oil_change)) - (Number(a.car_mileage) -Number(a.last_oil_change)))
            }).map( (car, index) =>{
                if(car.driver_first_name === null && car.driver_last_name === null){
                    car.driver_first_name = ''
                    car.driver_last_name = ''
                }
                if(index %2 ===0){
                    return(
                        <tr style={{background:'#ebe461'}} key={index}>
                            {/* <td>{index + 1}</td> */}
                            <td>{car.car_id}</td>
                            <td onClick={() => this.props.history.push(`/user/admin/api/cars/${car.car_id}`)}>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</td>
                            <td>{Number(car.car_mileage) -Number(car.last_oil_change)}</td>
                            {/* <td>{`${car.car_city}, ${car.car_state}`}</td> */}
                            {/* <td>{car.driver_id}</td> */}
                            <td>{`${car.driver_first_name} ${car.driver_last_name}`}</td>
                            {/* <td><Link to={`/user/admin/api/cars/${car.car_id}`}>View Details</Link></td> */}
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'#6067ea'}} key={index}>
                            {/* <td>{index + 1}</td> */}
                            <td>{car.car_id}</td>
                            <td onClick={() => this.props.history.push(`/user/admin/api/cars/${car.car_id}`)}>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</td>
                            <td>{Number(car.car_mileage) -Number(car.last_oil_change)}</td>
                            {/* <td>{`${car.car_city}, ${car.car_state}`}</td> */}
                            {/* <td>{car.driver_id}</td> */}
                            <td>{`${car.driver_first_name} ${car.driver_last_name}`}</td>
                            {/* <td><Link to={`/user/admin/api/cars/${car.car_id}`}>View Details</Link></td> */}
                        </tr>
                    )
                }
            })
        }

        return(
            <div className='outerMaintenanceDiv'>
                {(this.props.user) ?
                    <div className='maintenanceTableDiv'>
                        <h3 className='maintenanceTitle'>Car Needing Maintenance</h3>
                        <table className='maintenanceTable'>
                            <tr style={{background: '#6067ea'}}>
                                {/* <th></th> */}
                                <th>Car ID</th>
                                <th>Car Info</th>
                                <th>Miles Since Last Oil Change</th>
                                {/* <th>Car Location</th> */}
                                {/* <th>Driver ID</th> */}
                                <th>Driver Name</th>
                                {/* <th></th> */}
                            </tr>
                            {car}

                        </table>
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
        cars: state.cars.data
    }
}

export default connect(mapStateToProps, {getCars})(Maintenance)