import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getUser} from '../../redux/reducers/users'
import logo from '../Logo/fleetnannyLogoNew.JPG'

import './header.css'


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
                        {!this.props.admin_username ? 
                        <div className='noLoggedInLogo'>
                            <img id='onlyLogo' src={logo}/>
                        </div>
                        
            
                        :
                        <div className='loggedInOuterHeader'>
                            <div className='logoOnly'>
                                <img id='logo' src={logo}/>
                            </div>
                            
                
                            <div className='loggedInHeader'>
                                <div className='noLogoHeader'>
                                    <div className='loggedInLogoDiv'>
                                        <img id='loggedInLogo' src={this.props.admin_img}/>
                                        <Link id='usernameLink' to='/userInfo'><p>{this.props.admin_username} </p></Link>
                                    </div>
                                    <div className='loggedInLinks'>
                                        {<Link id='logoutLink' to='/'><button onClick={this.handleLogout}> Logout </button></Link>}
                                    </div>
                                </div>
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