import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import {register} from '../../redux/reducers/users'

import {connect} from 'react-redux'

class CreateAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            admin_first_name: '',
            admin_last_name: '',
            admin_username: '',
            admin_password: '',
            admin_phone: '',
            admin_img: ''
        }
    }

    handleChange(event) {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleRegister = async() => {
        for( let key in this.state){
            console.log(111111111, this.state[key])
            if (this.state[key] === ''){
                console.log("hit '' ")
                return alert('All fields must be filled in')
            }
        }
        await this.props.register(this.state)
        this.setState({
            admin_first_name: '',
            admin_last_name: '',
            admin_username: '',
            admin_password: '',
            admin_phone: '',
            admin_img: ''
        })
        this.props.history.push('/auth/login')
    }

    render() {
        return(
            <div>
                <div>
                    <input 
                    type='text' 
                    placeholder='First Name' 
                    value={this.state.admin_first_name} 
                    name='admin_first_name'
                    onChange={event => this.handleChange(event)} />
                    <input 
                    type='text' 
                    placeholder='Last Name' 
                    value={this.state.admin_last_name} 
                    name='admin_last_name'
                    onChange={event => this.handleChange(event)} />
                    <input 
                    type='text' 
                    placeholder='Username' 
                    value={this.state.admin_username} 
                    name='admin_username'
                    onChange={event => this.handleChange(event)} />
                    <input 
                    type='text' 
                    placeholder='Password' 
                    value={this.state.admin_password} 
                    name='admin_password'
                    onChange={event => this.handleChange(event)} />
                    <input 
                    type='text' 
                    placeholder='Phone Number' 
                    value={this.state.admin_phone} 
                    name='admin_phone'
                    onChange={event => this.handleChange(event)} />
                    <input 
                    type='text' 
                    placeholder='Profile Picture' 
                    value={this.state.admin_img} 
                    name='admin_img'
                    onChange={event => this.handleChange(event)} />
                </div>
                <div>
                <button onClick={this.handleRegister}>Create User</button>
                    <Link to='/auth/login'><button>Login As Existing User</button></Link>

                </div>
            </div>
        )
    }
}

export default connect(null, {register})(CreateAccount)