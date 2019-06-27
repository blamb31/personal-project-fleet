import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getDriversInfo, addDriver} from '../../redux/reducers/drivers'


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
        console.log(this.props)
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
                        <tr style={{background:'white'}} key={index}>
                            <td>{index + 1}</td>
                            <td>{driver.driver_id}</td>
                            <td>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'gray'}} key={index}>
                            <td>{index + 1}</td>
                            <td>{driver.driver_id}</td>
                            <td>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                        </tr>
                    )
                }
            })
        }
        return(
            <div>
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
                    <div>
                        <button onClick={this.handleAddDriver} >Add Driver</button>
                        <button onClick={() => window.history.back()}>Cancel</button>
                    </div>
                </div>
                <div>
                    {(this.props.user) ?
                        <div>
                            <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                                <h3>Drivers In The Fleet</h3>
                                <table>
                                    <tr style={{background: 'gray'}}>
                                        <th></th>
                                        <th>Driver ID</th>
                                        <th>Driver Name</th>
                                    </tr>
                                    {driver}
                                </table>
                            </div>
                        </div>
                    :
                        <Redirect to='/' />
                    }
                </div>
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