import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getUser} from '../../redux/reducers/users'
import logo from '../Logo/fleetnannyLogo.png'

import './header.scss'


class Header extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUser()
    }
    
    handleLogout = () => {
        this.props.logout()
    }

    render(){
        return (
           <div className='headerDiv'>
                        <div className='logoOnly'>
                            <img src={logo}/>
                        </div>
                        {!this.props.admin_username ? 
                        <div>
                        </div>
            
                        :
            
                        <div className='loggedInHeader'>
                            <div className='loggedInLogoDiv'>
                                <img id='loggedInLogo' src={this.props.admin_img}/>
                            </div>
                            <div className='loggedInLinks'>
                                <Link to='/userInfo'><p>{this.props.admin_username} </p></Link>
                                {<Link to='/'><button onClick={this.handleLogout}> Logout </button></Link>}
                            </div>
                        </div>
                        }
           </div>
       )
    }
}

let mapStateToProps = state => {
    let {data: user} = state.users
    return user
}

export default connect(mapStateToProps, {logout, getUser})(Header)