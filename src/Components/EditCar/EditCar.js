import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {getCar, editCar} from '../../redux/reducers/cars'

class EditCar extends Component {
            
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
        await this.props.getCar(this.props.match.params.id)
        if(this.props.car){
            let {car} = this.props
            this.setState({
                driver_id: car.driver_id,
                car_make: car.car_make,
                car_model: car.car_model,
                car_year: car.car_year,
                car_color: car.car_color,
                car_mileage: car.car_mileage,
                car_img: car.car_img,
                car_address: car.car_address,
                car_zip_code: car.car_zip_code,
                car_city: car.car_city,
                car_state: car.car_state,
                last_oil_change: car.last_oil_change
            })
        }
    }

    handleChange(event){
        let {name, value} = event.target
        if( name === 'driver_id' && (value === 0 || value === '')){
            this.setState({
            driver_id: null
            })
        
        }else{
            this.setState({
                [name]:value
            })
        }
    }

    handleEditCar = () => {
        for( let key in this.state) {
            if(this.state[key] === '' && key !== 'driver_id'){
                return alert('Please fill in all fields')
            }
        }
        this.props.editCar(this.props.match.params.id, this.state)
        
    }

    render() {
        
        
        return(
            <div>

                <img src={this.state.car_img} />
                             
                <div>
                    <div>
                        <p>Driver ID:</p>
                        <input 
                        type='number' 
                        placeholder='Driver ID' 
                        value={this.state.driver_id} 
                        name='driver_id' 
                        onChange={event => this.handleChange(event)} />
                    </div>
                    <div>
                        <input 
                        type='text' 
                        placeholder='Car Make' 
                        value={this.state.car_make} 
                        name='car_make' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Model' 
                        value={this.state.car_model} 
                        name='car_model' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Year' 
                        value={this.state.car_year} 
                        name='car_year' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Color' 
                        value={this.state.car_color} 
                        name='car_color' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Mileage' 
                        value={this.state.car_mileage} 
                        name='car_mileage' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Image' 
                        value={this.state.car_img} 
                        name='car_img' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car Address' 
                        value={this.state.car_address} 
                        name='car_address' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car Zip Code' 
                        value={this.state.car_zip_code} 
                        name='car_zip_code' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car City' 
                        value={this.state.car_city} 
                        name='car_city' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car State' 
                        value={this.state.car_state} 
                        name='car_state' 
                        onChange={event => this.handleChange(event)} />
                        <div>
                            <p>Mileage At Last Oil Change: </p>
                            <input 
                            type='number'
                            placeholder='Mileage At Last Oil Change' 
                            value={this.state.last_oil_change} 
                            name='last_oil_change' 
                            onChange={event => this.handleChange(event)} />
                        </div>
                        <Link to='/user/admin/api/cars'><button onClick={this.handleEditCar}>Save Changes</button></Link>
                        <button onClick={() => window.history.back()}>Cancel Changes</button>

                    </div>


                </div>
                
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.users.data,
        car: state.cars.selected,
    }
}

           


export default connect(mapStateToProps, {getCar, editCar})(EditCar)