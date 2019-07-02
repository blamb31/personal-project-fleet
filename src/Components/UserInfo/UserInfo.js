import React from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


function UserInfo(props) {
    console.log(292929, props)
    let {user} = props
    return(
        <div>
            User Info Page
            {props.user ?
            <div>

                <div>
                    <h1>{`${user.admin_company_name}`}</h1>
                    <img width={200} src={user.admin_img} />
                    <h3>{`${user.admin_first_name} ${user.admin_last_name}`}</h3>
                    <h3>{user.admin_username}</h3>
                    <h3>{user.admin_phone}</h3>
                </div>
                <div>
                    <button onClick={ () => props.history.push(`/userInfo/edit/${user.admin_id}`)} >Edit</button>
                    <button onClick={ () => props.history.push('/user/admin/api/cars')} >Back</button>
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