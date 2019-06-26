import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {getCar, addMiles} from '../../redux/reducers/cars'

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

    handleAddMiles = (currentMiles) => {
        let updatedMiles = (Number(currentMiles) + Number(this.state.addMiles))
        this.props.addMiles(this.props.match.params.id, updatedMiles)
        this.setState({
            addMiles: 0
        })
    }

    render() {
        console.log(this.props)
        let {car} = this.props
        return(
            <div>
                Single Car View
                <Link to='/user/admin/api/cars'>Back</Link>
                {this.props.car && 
                    <div>
                        <h3>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</h3>
                        <p>{`${car.car_address}`} </p>
                        <p>{`${car.car_city}, ${car.car_state} ${car.car_zip_code}`}</p>
                        <p>{`Current Mileage: ${car.car_mileage}`}</p>
                        <p>{`Miles At Last Oil Change : ${car.last_oil_change}`}</p>
                        <p>{`Mileage Since Last Oil Change: ${car.car_mileage - car.last_oil_change}`}</p>
                        <input 
                        min={0}
                        placeholder='Add Miles Here' 
                        name='addMiles' 
                        value={this.state.addMiles}
                        type='number'
                        onChange={event => this.handleChange(event)} />
                        <button onClick={() => this.handleAddMiles(car.car_mileage)}>Add Miles</button>
                    </div>
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        car: state.cars.selected
    }
}

export default connect(mapStateToProps, {getCar, addMiles})(Car)