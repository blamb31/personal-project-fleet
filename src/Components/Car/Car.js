import React, {Component} from 'react'

import {connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import {getCar, addMiles, gotOilChange,deleteCar} from '../../redux/reducers/cars'

class Car extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addMiles: null
        }
    }

    componentDidMount(){
        this.props.getCar(this.props.match.params.id)
    }

    handleChange(event){
        let {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleDeleteCar(id){
        this.props.deleteCar(id)
        this.props.history.push('/user/admin/api/cars')
    }

    handleAddMiles = (currentMiles) => {
        let updatedMiles = (Number(currentMiles) + Number(this.state.addMiles))
        this.props.addMiles(this.props.match.params.id, updatedMiles)
        this.setState({
            addMiles: 0
        })
    }

    handleGotOilChange = (currentMiles) => {
        
        this.props.gotOilChange(this.props.match.params.id, currentMiles)
    }

    render() {
        let {car} = this.props
        console.log(232332, this.props)
        return(
            <div>
                {this.props.user ?
                    <div>
                    {this.props.car && 
                        <div>
                            
                            <h3>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</h3>
                            <img width={200} src={`${car.car_img}`} />
                            <p>{`${car.car_address}`} </p>
                            <p>{`${car.car_city}, ${car.car_state} ${car.car_zip_code}`}</p>
                            <p>{`Current Mileage: ${car.car_mileage}`}</p>
                            <p>{`Miles At Last Oil Change : ${car.last_oil_change}`}</p>
                            <p>{`Mileage Since Last Oil Change: ${car.car_mileage - car.last_oil_change}`}</p>
                            <button onClick={() => this.handleGotOilChange(car.car_mileage)}>Got Oil Change</button>
                            <input 
                            min={0}
                            placeholder='Add Miles Here' 
                            name='addMiles' 
                            value={this.state.addMiles}
                            type='number'
                            onChange={event => this.handleChange(event)} />
                            <button onClick={() => this.handleAddMiles(car.car_mileage)}>Add Miles</button>
                            <h3>{`Driver: ${car.driver_first_name} ${car.driver_last_name}`}</h3>
                            <img width={200} src={`${car.driver_img}`} />
                            <p>{`Driver ID: ${car.driver_id}`}</p>
                            {(car.car_mileage - car.last_oil_change >= 5000) &&
                            <div>
                                <h3>Mainenance Needed:</h3>
                                <ul>
                                    <li>Oil Change</li>
                                    <li>Tire Rotation</li>
                                </ul>
                            </div>

                            }
                            <button onClick={() => window.history.back()}>Back</button>
                            <button onClick={() => this.props.history.push(`/user/admin/api/cars/edit/${car.car_id}`)}>Edit</button>
                            <button onClick={() => this.handleDeleteCar(this.props.match.params.id)}>Delete Car</button>
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
        car: state.cars.selected
    }
}

export default connect(mapStateToProps, {getCar, addMiles, gotOilChange, deleteCar})(Car)