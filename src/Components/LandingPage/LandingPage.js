import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './landingPage.css'

import { connect } from 'react-redux';
import {getUser} from '../../redux/reducers/users'
import {Redirect} from 'react-router-dom'

class LandingPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false
        }
    }

    componentDidMount = async () => {
        await this.props.getUser() 

    }

    render() {
        console.log(this.props)
        return(
            <div className='loggedInCheck'>
                {this.props.user ? 
                <Redirect to='/user/admin/api/cars'/>

                :
                    
                    <div className='landingPage'>
                        <div className='lpContent'>
                            <h1 id='landingWelcome'>Welcome To fleetnanny</h1>
                            <h3 id='landingPlease'>Please log in or create an account</h3>
                        </div>
                        <div className='lpLinks'>
                            <Link className='lpLink' to='/auth/login'><button className='lpButton'>Login</button></Link>
                            <Link className='lpLink' to='/auth/register'><button className='lpButton'>Register</button></Link>
                        </div>
                    </div>
                }
            </div>
        )

    }
}

let mapStateToProps = (state) =>{
    console.log(787878, state)
    return {
        user: state.users.data
    }
}

export default connect(mapStateToProps, {getUser})(LandingPage)