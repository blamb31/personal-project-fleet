import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

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
            <div>
                <input value={this.state.username} name='username' onChange={event => this.handleChange(event)} type='text' placeholder='Username' />
                <input value={this.state.password} name='password' onChange={event => this.handleChange(event)} type='text' placeholder='Password' />
                <button onClick={this.handleLogin}>Login</button>
                <Link to='/auth/register'><button >Register</button> </Link>

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