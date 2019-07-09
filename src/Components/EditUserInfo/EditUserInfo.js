import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {getUser, editUser} from '../../redux/reducers/users'
import S3Bucket from '../S3Bucket/S3Bucket'

import './editUserInfo.css'

class EditUserInfo extends Component{
    constructor(props){
        super(props)

        this.state = {
            admin_first_name: '',
            admin_last_name: '',
            admin_company_name: '',
            admin_phone: '',
            admin_img: '',
        }
    }

    componentDidMount = async () =>  {
        await this.props.getUser

        console.log(375375, this.props)
        
        let {user} = this.props
        if(user){
            this.setState({
                admin_first_name: user.admin_first_name,
                admin_last_name: user.admin_last_name,
                admin_company_name: user.admin_company_name,
                admin_phone: user.admin_phone,
                admin_img: user.admin_img
            })
        }

    }

    handleChange(event) {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleEditUser(){
        for (let key in this.state) {
            if (!this.state[key]){
                alert('Please fill in all fields')
            }
        }
        this.props.editUser(this.props.match.params.id, this.state)
        window.history.back()
    }

    updateUserPic = (url) => {
        this.setState({
            admin_img: url
        })
    }

    render() {
        let {user} = this.props
        return(
            <div className='outerEditUserInfoDiv'>
                {user ?
                <div className='innerEditUserInfoDiv'>
                    <h3 className='editUserInfoTitle'>Edit Admin Info</h3>
                    <div className='editUserImageDiv'>
                        <img className='editUserImage' src={this.state.admin_img}/>
                        <S3Bucket updateUserPic={this.updateUserPic} />

                    </div>
                    <div className='editUserInputFields'>
                        <p>Name: </p>
                        <div className='editUserInfoNameInputs'> 
                            <input 
                            className='editUserInfoNameInput'
                            type='text' 
                            placeholder='First Name' 
                            value={this.state.admin_first_name} 
                            name='admin_first_name' 
                            onChange={event => this.handleChange(event)} />

                            <input 
                            className='editUserInfoNameInput'
                            type='text'
                            placeholder='Last Name' 
                            value={this.state.admin_last_name} 
                            name='admin_last_name' 
                            onChange={event => this.handleChange(event)} />
                        </div>
                        <p>Company Name:</p>
                        <div className='editUserInfoNameInputs'>

                            <input 
                            className='editUserInfoNameInput'
                            type='text'
                            placeholder='Company Name' 
                            value={this.state.admin_company_name} 
                            name='admin_company_name' 
                            onChange={event => this.handleChange(event)} />
                        </div>
                        <p>Phone Number: </p>
                        <div className='editUserInfoNameInputs'>

                            <input 
                            className='editUserInfoNameInput'
                            type='text'
                            placeholder='Phone Number' 
                            value={this.state.admin_phone} 
                            name='admin_phone' 
                            onChange={event => this.handleChange(event)} />

                        
                        </div>

                    </div>
                    <button className='saveUserEditInfoButton' onClick={() => this.handleEditUser()} >Save Changes</button>
                    
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
        user: state.users.data
    }
}

export default connect(mapStateToProps, {getUser, editUser})(EditUserInfo)