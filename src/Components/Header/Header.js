import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, getUser} from '../../redux/reducers/users'



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
               <div className='logoTitle'>
                   <img src="https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" width='100' />
                   <h3>Website Title</h3>
               </div>
               {!this.props.admin_username ? 
               <div>
               </div>
   
               :
   
               <div>
                   <Link to='/userInfo'><p>{this.props.admin_username} </p></Link>
                   {<Link to='/'><button onClick={this.handleLogout}> Logout </button></Link>}
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