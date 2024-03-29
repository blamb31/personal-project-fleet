import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import {register} from '../../redux/reducers/users'

import {connect} from 'react-redux'

import StripeCheckout from '../Stripe/Stripe'
import S3Bucket from '../S3Bucket/S3Bucket'

import './createAccount.css'
import emptyImage from '../Logo/emptyImage.jpg'

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
            <div className='createAccount'>
                <div className='pageWrapper'>
                    <div id='createInputsDiv'>
                        <h1 className='welcomeCreate'>Welcome! Please Create An Account</h1>
                        {this.state.admin_img === '' ?
                        <div className='cAdminImgDiv'>
                            <img id='adminImg'  src={emptyImage} />
                    
                        </div>

                        :

                        <div className='cAdminImgDiv'>
                            <img id='adminImgHolder'  src={this.state.admin_img} />                            
                        </div>
                    
                        }
                        <S3Bucket setUserPic={this.setUserPic}/>
                        <div className='cAdminInputDivs'>
                            <p>First Name: </p>
                                <input 
                                type='text' 
                                placeholder='First Name' 
                                value={this.state.admin_first_name} 
                                name='admin_first_name'
                                onChange={event => this.handleChange(event)}
                                className='cAdminInputs' />
                        </div>
                        <div className='cAdminInputDivs'>
                            <p>Last Name: </p>
                            <input 
                            type='text' 
                            placeholder='Last Name' 
                            value={this.state.admin_last_name} 
                            name='admin_last_name'
                            onChange={event => this.handleChange(event)}
                            className='cAdminInputs' />

                        </div>
                        <div className='cAdminInputDivs'>
                            <p>Company Name: </p>
                            <input 
                            type='text' 
                            placeholder='Company Name' 
                            value={this.state.admin_company_name} 
                            name='admin_company_name'
                            onChange={event => this.handleChange(event)}
                            className='cAdminInputs' />

                        </div>
                        <div className='cAdminInputDivs'>
                            <p>Phone Number: </p>
                            <input 
                            type='text' 
                            placeholder='Phone Number' 
                            value={this.state.admin_phone} 
                            name='admin_phone'
                            onChange={event => this.handleChange(event)}
                            className='cAdminInputs' />

                        </div>
                        <div className='cAdminInputDivs'>
                            <p>Username: </p>
                            <input 
                            type='text' 
                            placeholder='Username' 
                            value={this.state.admin_username} 
                            name='admin_username'
                            onChange={event => this.handleChange(event)}
                            className='cAdminInputs' />

                        </div>
                        <div className='cAdminInputDivs'>
                            <p>Password: </p>
                            <input 
                            type='password' 
                            placeholder='Password' 
                            value={this.state.admin_password} 
                            name='admin_password'
                            onChange={event => this.handleChange(event)}
                            className='cAdminInputs' />

                        </div>
                        
                    </div>
                    
                    <div className='createButtons'>
                        {!this.state.filled ?
                            <button className='createAccountButtons' onClick={this.handleRegister}>Create Account</button>
                        :
                        
                            <StripeCheckout userInfo={this.state} handleRegister={this.handleRegister} />
                        }
                    <button className='createAccountButtons' onClick={() => this.props.history.push('/auth/login')}>Login As Existing User</button>

                    </div>

                </div>
                
            </div>
        )
    }
}

export default connect(null, {register})(CreateAccount)