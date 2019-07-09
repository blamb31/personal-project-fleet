import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getDriversInfo, addDriver} from '../../redux/reducers/drivers'

import './drivers.css'


class Drivers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driver_first_name: '', 
            driver_last_name: '', 
            driver_phone: '', 
            driver_img: '', 
        }
    }

    componentDidMount = async () => {
        await this.props.getDriversInfo()
    }
    
    handleChange(event){
        let {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleAddDriver = () => {
        for( let key in this.state) {
            if(!this.state[key]){
                return alert('Please fill in all fields')
            }
        }
        this.props.addDriver(this.state)
        this.setState({
            driver_first_name: '', 
            driver_last_name: '', 
            driver_phone: '', 
            driver_img: '',
        })
    }
    
    render() {
        let {drivers} = this.props
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
                            {/* <td>{index + 1}</td> */}
                            <td className='center'>{driver.driver_id}</td>
                            <td className='tableDriverName' onClick={() => this.props.history.push(`/user/admin/api/drivers/${driver.driver_id}`)}>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                            {/* <Link to={`/user/admin/api/cars/${driver.car_id}`}><td>{`${driver.car_year} ${driver.car_make} ${driver.car_model} (${driver.car_color})`}</td></Link> */}
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'#6067ea', color: '#fffdee'}} key={index}>
                            {/* <td>{index + 1}</td> */}
                            <td className='center'>{driver.driver_id}</td>
                            <td className='tableDriverName' onClick={() => this.props.history.push(`/user/admin/api/drivers/${driver.driver_id}`)}>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                            {/* <Link to={`/user/admin/api/cars/${driver.car_id}`}><td>{`${driver.car_year} ${driver.car_make} ${driver.car_model} (${driver.car_color})`}</td></Link> */}
                        </tr>
                    )
                }
            })
        }
        return(
            <div className='mainDriversDiv'>
                {/* <div>
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
                        <button onClick={this.handleAddDriver} >Add Driver</button>
                    </div>
                </div> */}
                {(this.props.user) ?
                    <div className='outerDriversDiv'>
                            <h3 className='driversTitle'>Drivers In The Fleet</h3>
                            <button className='addDriverButton' onClick={() => this.props.history.push('/user/admin/api/createDriver')}>Add Driver</button>
                            <table className='driversTable'>
                                <tr style={{background: '#6067ea', color: '#fffdee'}}>
                                    {/* <th></th> */}
                                    <th>Driver ID</th>
                                    <th>Driver Name</th>
                                    {/* <th>Car Information</th> */}
                                </tr>
                                {driver}
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
        drivers: state.drivers.data
    }
}

export default connect(mapStateToProps, {getDriversInfo, addDriver})(Drivers)