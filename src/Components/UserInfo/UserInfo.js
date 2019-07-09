import React from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import './userInfo.css'


function UserInfo(props) {
    console.log(292929, props)
    let {user} = props
    return(
        <div className='outerUserInfoDiv'>
            {props.user ?
            <div className='innerUserInfoDiv'>

                <h1 className='userInfoCompanyTitle'>{`${user.admin_company_name}`}</h1>
                <img className='userInfoImage' src={user.admin_img} />
                <div className='userInfoDiv'>
                    
                    <h3 className='userInfoText'>{`Name: ${user.admin_first_name} ${user.admin_last_name}`}</h3>
                    <h3 className='userInfoText'>{`Username: ${user.admin_username}`}</h3>
                    <h3 className='userInfoText'>{`Phone Number: ${user.admin_phone}`}</h3>
                </div>
                <div className='userInfoButtonsDiv'>
                    <button className='userInfoButton' onClick={ () => window.history.back()} >Back</button>
                    <button className='userInfoButton' onClick={ () => props.history.push(`/userInfo/edit/${user.admin_id}`)} >Edit</button>
                </div>
            </div>
            :
            <Redirect to='/' />
            }
        </div>
    )
}

let mapStateToProps = state => {
    return {
        user: state.users.data
    }
}

export default connect(mapStateToProps)(UserInfo)