import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {getUser, editUser} from '../../redux/reducers/users'
import S3Bucket from '../S3Bucket/S3Bucket'


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

    render() {
        let {user} = this.props
        return(
            <div>
                {user ?
                <div>
                    Edit User Page
                    <img src={this.state.admin_img}/>
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
                        placeholder='Phone Number' 
                        value={this.state.admin_phone} 
                        name='admin_phone' 
                        onChange={event => this.handleChange(event)} />

                        {/* <input 
                        type='text'
                        placeholder='Profile Picture URL' 
                        value={this.state.admin_img} 
                        name='admin_img' 
                        onChange={event => this.handleChange(event)} /> */}
                        <S3Bucket />
                    </div>

                    
                    <div>
                        <button onClick={() => this.handleEditUser()} >Save Changes</button>
                    </div>
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