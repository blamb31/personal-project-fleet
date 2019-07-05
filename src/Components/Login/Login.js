import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import './login.css'

import {login} from '../../redux/reducers/users'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : ''
        }
    }

    handleChange(event) {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleLogin = async () =>  {
        let {username, password} = this.state
        if(username === '' || password === '') {
            return alert('Must enter a username and password')
        }
        await this.props.login({username, password})
        this.setState({
            username: '',
            password: ''
        })
        this.props.history.push('/user/admin/api/cars')
    }

    render() {
        return(
            <div className='loginPage'>
                <div className='loginInputs'>
                    <input className='loginInput' value={this.state.username} name='username' onChange={event => this.handleChange(event)} type='text' placeholder='Username' />
                    <input className='loginInput' value={this.state.password} name='password' onChange={event => this.handleChange(event)} type='password' placeholder='Password' />
                </div>
                <div className='loginButtons'>
                    <button className='loginButton' onClick={this.handleLogin}>Login</button>
                    <button onClick={() => this.props.history.push('/auth/register')} className='loginButton' >Register</button> 
                </div>

            </div>
        )
    }
}

let mapStateToProps = (state) =>{
    return {
        user: state.users.data
    }
}

export default connect(mapStateToProps, {login})(Login)