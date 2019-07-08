import React, {Component} from 'react'

import {connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import Axios from 'axios'

import {getCar, addMiles, gotOilChange,deleteCar} from '../../redux/reducers/cars'

import './car.css'

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

    handleAddMiles = (currentMiles, last_oil_change, car) => {
        let updatedMiles = (Number(currentMiles) + Number(this.state.addMiles))
        this.props.addMiles(this.props.match.params.id, updatedMiles)
        this.setState({
            addMiles: 0
        })

        if(updatedMiles - last_oil_change >= 5000){
            async function send() {
                let name = `${car.driver_first_name} ${car.driver_last_name}`
                let adminName = `${car.admin_first_name} ${car.admin_last_name}`
                let message = `Hello, ${name}. Your car, ${car.car_color} ${car.car_year} ${car.car_make} ${car.car_model}, is now at ${updatedMiles} miles (${updatedMiles - last_oil_change} miles since the oil was last changed). Please get the oil changed and the tires rotated and then contact your fleet administrator, ${adminName}`
                let res = Axios.post('/api/sendSMS', { adminName, message })
                await alert(`Message has been sent to notify ${name} of the needed maintenance`)
                // setName('')
                // setMessage('')
              }
            send()
        }
    }

    handleGotOilChange = (currentMiles) => {
        
        this.props.gotOilChange(this.props.match.params.id, currentMiles)
    }

    render() {
        let {car} = this.props
        return(
            <div className='singleCarOuterDiv'>
                {/* {this.props.user ? */}
                {this.props ?
                
                    <div className='outerCarViewDiv'>
                        {this.props.car && 
                        <div>
                            <div className='carViewDiv'>
                                
                                <h3 id='indCarTitle'>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</h3>
                                <img id='indCarPic'  src={`${car.car_img}`} />
                                <div id='indCarAddress'>
                                    <p>{`${car.car_address}`} </p>
                                    <p>{`${car.car_city}, ${car.car_state} ${car.car_zip_code}`}</p>
                                </div>
                                <div id='indCarMileageInfo'>
                                    <p className='shrinkText'>{`Current Mileage: ${car.car_mileage}`}</p>
                                    <p id='middleRow' className='shrinkText'>{`Miles At Last Oil Change : ${car.last_oil_change}`}</p>
                                    <div id='indCarOilChangeInfo'>
                                        <p className='shrinkText'>{`Miles Since Oil Change: ${car.car_mileage - car.last_oil_change}`}</p>
                                        <button className='shrinkText indCarButtonMarg' onClick={() => this.handleGotOilChange(car.car_mileage)}>Oil Changed</button>
                                    </div>
                                    <div className='inputMilesDiv'>
                                        <input 
                                        min={0}
                                        placeholder='Add Miles Here' 
                                        name='addMiles' 
                                        value={this.state.addMiles}
                                        type='number'
                                        onChange={event => this.handleChange(event)} />
                                        <button className='indCarButtonMarg' onClick={() => this.handleAddMiles(car.car_mileage, car.last_oil_change, car)}>Add Miles</button>

                                    </div>
                                </div>
                            </div>
                            <div className='indCarDriverDiv'>
                                {car.driver_id &&
                                    <div className='indCarDriverInfo'>
                                        <h3>{`Driver: ${car.driver_first_name} ${car.driver_last_name}`}</h3>
                                        <img width={200} src={`${car.driver_img}`} />
                                        <p>{`Driver ID: ${car.driver_id}`}</p>
                                    </div>
                                    }
                                    {(car.car_mileage - car.last_oil_change >= 5000) &&
                                    <div className='indCarMaintenenceDiv'>
                                        <h3>Mainenance Needed:</h3>
                                        <ul>
                                            <li>Oil Change</li>
                                            <li>Tire Rotation</li>
                                        </ul>
                                    </div>


                                    }
                                    <div className='indCarButtons'>
                                        <button onClick={() => window.history.back()}>Back</button>
                                        <button className='indCarMiddleButton' onClick={() => this.props.history.push(`/user/admin/api/cars/edit/${car.car_id}`)}>Edit Car</button>
                                        <button onClick={() => this.handleDeleteCar(this.props.match.params.id)}>Delete Car</button>

                                    </div>

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
        car: state.cars.selected
    }
}

export default connect(mapStateToProps, {getCar, addMiles, gotOilChange, deleteCar})(Car)