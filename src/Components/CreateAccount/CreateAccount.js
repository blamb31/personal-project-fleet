import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import {register} from '../../redux/reducers/users'

import {connect} from 'react-redux'

import StripeCheckout from '../Stripe/Stripe'
import S3Bucket from '../S3Bucket/S3Bucket'

class CreateAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            admin_first_name: '',
            admin_last_name: '',
            admin_username: '',
            admin_password: '',
            admin_phone: '',
            admin_img: '',
            filled: false,
        }
    }

    handleChange(event) {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
        for( let key in this.state){
            if (this.state[key] === ''){
                console.log("empty")
                return
            }
        }
        this.setState({
            filled: true
        })
    }

    handleRegister = async() => {
        console.log("New Props: ", this.props)
        for( let key in this.state){
            if (this.state[key] === ''){
                return alert('All fields must be filled in')
            }
        }
        await this.props.register(this.state)
        this.setState({
            admin_first_name: '',
            admin_last_name: '',
            admin_company_name: '',
            admin_username: '',
            admin_password: '',
            admin_phone: '',
            admin_img: ''
        })
        this.props.history.push('/user/admin/api/cars')
    }

    setUserPic = (url) => {
        this.setState({
            admin_img: url
        })
    }

    render() {
        return(
            <div>
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
                        placeholder='Company Name' 
                        value={this.state.admin_company_name} 
                        name='admin_company_name'
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
                        {/* <input 
                        type='text' 
                        placeholder='Profile Picture' 
                        value={this.state.admin_img} 
                        name='admin_img'
                        onChange={event => this.handleChange(event)} /> */}
                        <S3Bucket setUserPic={this.setUserPic}/>
                    </div>
                    <div>
                        {!this.state.filled ?
                            <button onClick={this.handleRegister}>Create Account</button>
                        :
                        
                            <StripeCheckout userInfo={this.state} handleRegister={this.handleRegister} />
                        }
                    <Link to='/auth/login'><button>Login As Existing User</button></Link>

                    </div>

                </div>
                
            </div>
        )
    }
}

export default connect(null, {register})(CreateAccount)