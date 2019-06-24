import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Header(props){
    console.log(99999999999999, props)
    return (
        <div className='headerDiv'>
            <div className='logoTitle'>
                <img src="https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" width='100' />
                <h3>Website Title</h3>
            </div>
            {!props.admin_username ? 
            <div>
                No Username
            </div>

            :

            <div>
                <p>{props.admin_username} </p>
                {<Link to='/'>Logout</Link>}
            </div>
            }
        </div>
    )
}

let mapStateToProps = state => {
    console.log(777777777777, state)
    let {data: user} = state.users
    return user
}

export default connect(mapStateToProps)(Header)