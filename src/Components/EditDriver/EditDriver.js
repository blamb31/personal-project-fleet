import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {getDriver, editDriver} from '../../redux/reducers/drivers'
import { stat } from 'fs';

class EditDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driver_first_name: '',
            driver_last_name: '',
            driver_phone: '',
            driver_img: ''
        }
    }

    componentDidMount = async () => {
        await this.props.getDriver(this.props.match.params.id)

        if(this.props.driver) {
            let {driver} = this.props
            this.setState({
                driver_first_name: driver.driver_first_name,
                driver_last_name: driver.driver_last_name,
                driver_phone: driver.driver_phone,
                driver_img: driver.driver_img
            })
        }
    }

    handleChange(event){
        let {name, value} = event.target

        this.setState({
            [name]:value
        })      
    }

    handleEditDriver = async () => {
        for(let key in this.state) {
            if (!this.state[key]) {
                return alert('Please fill in all fields')
            }
        }
        await this.props.editDriver(this.props.match.params.id, this.state)
        this.props.history.push(`/user/admin/api/drivers/${this.props.match.params.id}`)
    }

    render(){
        console.log(this.props)
        return(
            <div>
                {this.props.user ?
                <div>
                    
                    <img src={this.state.driver_img} />
                    
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
                            <button onClick={ () => window.history.back()} >Back</button>
                            <button onClick={() => this.handleEditDriver()} >Submit</button>
                        </div>
                    </div>

                </div>
                :
                <Redirect to='/' />
                }
            </div>
        )
    }
}

let mapStateToProps = state =>{
    return {
        user: state.users.data,
        driver: state.drivers.selected
    }
}

export default connect(mapStateToProps, {getDriver, editDriver})(EditDriver)