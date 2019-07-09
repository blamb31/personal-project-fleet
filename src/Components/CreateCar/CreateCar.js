import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getCars, addCar} from '../../redux/reducers/cars'
import {getDriversInfo} from '../../redux/reducers/drivers'
import S3Bucket from '../S3Bucket/S3Bucket';
import emptyImage from '../Logo/emptyImage.jpg'


import './createCar.css'

class CreateCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            driver_id: null, 
            car_make: '', 
            car_model: '', 
            car_year: '', 
            car_color: '', 
            car_mileage: '', 
            car_img: '', 
            car_address: '', 
            car_zip_code: '', 
            car_city: '', 
            car_state: '', 
            last_oil_change: null

        }
    }

    componentDidMount = async () => {
        await this.props.getCars()
        await this.props.getDriversInfo()
    }

    handleChange = async (event) => {
        let {name, value} = event.target
        await this.setState({
            [name]:value
        })
        if(name === 'driver_id' && this.state.driver_id === '') {
            console.log('hit driver_id')
            this.setState({
                driver_id: null
            })
        }
        
    }

    handleAddCar = () => {
        for( let key in this.state) {
            if(this.state[key] === '' || !this.state.last_oil_change){
                return alert('Please fill in all fields')
            }
        }
        this.props.addCar(this.state)
        this.props.getDriversInfo()
        this.setState({
            driver_id: null, 
            car_make: '', 
            car_model: '', 
            car_year: '', 
            car_color: '', 
            car_mileage: '', 
            car_img: '', 
            car_address: '', 
            car_zip_code: '', 
            car_city: '', 
            car_state: '', 
            last_oil_change: 0
        })
        this.props.history.push('/user/admin/api/cars')
    }

    setCarPic = (url) => {
        this.setState({
            car_img: url
        })
    }
    
    render() {
        let {cars, drivers} = this.props
        let driver;
        if(this.props.user){

            function removeDuplicates(originalArray, prop) {
                var newArray = [];
                var lookupObject  = {};
           
                for(var i in originalArray) {
                   lookupObject[originalArray[i][prop]] = originalArray[i];
                }
           
                for(i in lookupObject) {
                    newArray.push(lookupObject[i]);
                }
                 return newArray;
            }
           
           let driversArray = removeDuplicates(drivers, "driver_id")

            let listDriver = driversArray.sort((a, b) => {
                if(a.driver_first_name.toLowerCase() < b.driver_first_name.toLowerCase()){
                    return -1
                }
                if (a.driver_first_name.toLowerCase() > b.driver_first_name.toLowerCase()) {
                    return 1
                }
            })

            driver = listDriver.map((driver, index) => {
                if(index % 2 === 0){
                    return(
                        <tr style={{background:'#ebe461'}} key={index}>
                            <td>{driver.driver_id}</td>
                            <td onClick={() => this.props.history.push(`/user/admin/api/drivers/${driver.driver_id}`)}>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'#6067ed'}} key={index}>
                            <td>{driver.driver_id}</td>
                            <td onClick={() => this.props.history.push(`/user/admin/api/drivers/${driver.driver_id}`)}>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                        </tr>
                    )
                }
            })
        }
        return (
            <div className='allAddCarWrapper'>
                <div className='addCarContentWrapper'>
                    <div className='newCarImageOuterDiv'>
                        {this.state.car_img ? 
                        <div className='newCarImageDiv'>
                            <img src={this.state.car_img} />
                        </div>

                        :

                        <div>
                            <img src={emptyImage} />
                        </div>

                        }

                    </div>
                    <div className='driverIdDiv'>
                        <p>Driver ID:</p>
                        <input className='newCarInfoInput'
                        type='number' 
                        placeholder='' 
                        value={this.state.driver_id} 
                        name='driver_id' 
                        onChange={event => this.handleChange(event)} />
                    </div>
                    <div>
                        <input className='newCarInfoInput'
                        type='text' 
                        placeholder='Car Make' 
                        value={this.state.car_make} 
                        name='car_make' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car Model' 
                        value={this.state.car_model} 
                        name='car_model' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car Year' 
                        value={this.state.car_year} 
                        name='car_year' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car Color' 
                        value={this.state.car_color} 
                        name='car_color' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car Mileage' 
                        value={this.state.car_mileage} 
                        name='car_mileage' 
                        onChange={event => this.handleChange(event)} />
                        
                        {/* <input 
                        type='text'
                        placeholder='Car Image' 
                        value={this.state.car_img} 
                        name='car_img' 
                        onChange={event => this.handleChange(event)} /> */}
                    
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car Address' 
                        value={this.state.car_address} 
                        name='car_address' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car Zip Code' 
                        value={this.state.car_zip_code} 
                        name='car_zip_code' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car City' 
                        value={this.state.car_city} 
                        name='car_city' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input className='newCarInfoInput'
                        type='text'
                        placeholder='Car State' 
                        value={this.state.car_state} 
                        name='car_state' 
                        onChange={event => this.handleChange(event)} />
                        <div className='driverIdDiv'>
                            <p>Mileage At Last Oil Change: </p>
                            <input className='newCarInfoInput'
                            type='number'
                            placeholder='' 
                            value={this.state.last_oil_change} 
                            name='last_oil_change' 
                            onChange={event => this.handleChange(event)} />
                        </div>
                        <S3Bucket setCarPic={this.setCarPic} />
                        <div className='addCancelButtons'>
                            <button className='addDeleteButton' onClick={() => window.history.back()} >Cancel</button>
                            <button className='addDeleteButton' onClick={this.handleAddCar}>Add New Car</button>
                        </div>
                        <div>
                            {/* {(this.props.user) ? */}
                            {(this.props) ?

                                <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                                    <h3>Drivers</h3>
                                    <table className='createCarTable'>
                                        <tr style={{background: '#6067ed'}}>
                                            <th>Driver ID</th>
                                            <th>Driver Info</th>
                                        </tr>
                                        {driver}
                    
                                    </table>
                    
                                </div>
                            
                                :
                                    <Redirect to='/' />
                                }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

let mapStateToProps = state => {
    return {
        user: state.users.data,
        cars: state.cars.data,
        drivers: state.drivers.data
    }
}

export default connect(mapStateToProps, {addCar, getDriversInfo, getCars})(CreateCar)
