import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getCars} from '../../redux/reducers/cars'
import {getUser} from '../../redux/reducers/users'

class Cars extends Component {
    constructor(props) {
        super(props)
        console.log(22222222222, this.props)
    }

    componentDidMount = async () => {
        await this.props.getCars()
    }

    render() {
        console.log(this.props)
        let {cars} = this.props
        let car = cars.map( (car, index) =>{
            if(index %2 ===0){
                return(
                    <tr style={{background:'white'}} key={index}>
                        <th>{index + 1}</th>
                        <th>{car.car_id}</th>
                        <th>{`${car.car_year} ${car.car_make} ${car.car_model}(${car.car_color})`}</th>
                        <th>{`${car.car_city}, ${car.car_state}`}</th>
                        <th>{`${car.driver_first_name} ${car.driver_last_name}`}</th>
                        <th><Link to={`/user/admin/api/cars/${car.car_id}`}>View Details</Link></th>
                    </tr>
                )
            }else{
                return(
                    <tr style={{background:'gray'}} key={index}>
                        <th>{index + 1}</th>
                        <th>{car.car_id}</th>
                        <th>{`${car.car_year} ${car.car_make} ${car.car_model}(${car.car_color})`}</th>
                        <th>{`${car.car_city}, ${car.car_state}`}</th>
                        <th>{`${car.driver_first_name} ${car.driver_last_name}`}</th>
                        <th><Link to={`/user/admin/api/cars/${car.car_id}`}>View Details</Link></th>
                    </tr>
                )
            }
        })
        return(
            <div>
                {(this.props.user) ?
                    <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                        CARS COMPONENT
                        <table>
                            <tr style={{background: 'gray'}}>
                                <th></th>
                                <th>Car ID</th>
                                <th>Car Info</th>
                                <th>Car Location</th>
                                <th>Driver Info</th>
                                <th></th>
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

export default connect(mapStateToProps, {getCars})(Cars)