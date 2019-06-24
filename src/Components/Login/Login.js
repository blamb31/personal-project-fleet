import React, {Component} from 'react'
import { connect } from 'react-redux';

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

    handleSubmit = () =>  {
        let {username, password} = this.state
        this.props.login({username, password})
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return(
            <div>
                <input value={this.state.username} name='username' onChange={event => this.handleChange(event)} type='text' placeholder='Username' />
                <input value={this.state.password} name='password' onChange={event => this.handleChange(event)} type='text' placeholder='Password' />
                <button onClick={this.handleSubmit}>Login</button>
                <button >Register</button>

            </div>
        )
    }
}

export default connect(null, {login})(Login)