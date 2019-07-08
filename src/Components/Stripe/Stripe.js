import React, {Component} from 'react'
import Axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import {withRouter} from 'react-router-dom'

import {firstLogin} from '../../redux/reducers/users'
import {connect} from 'react-redux'

import './stripe.css'

class Stripe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'Create Admin',
      price: 15.00
    }
  }

  handleToken = async (token) =>  {
    console.log(token)
    try{
      let {userInfo} = this.props
      const response = await Axios.post('/auth/register', {
        token, 
        product: this.state,
        userInfo
      })
      await this.props.firstLogin(response.data)
      console.log(this.props)
      this.props.history.push('/user/admin/api/cars')

    }catch(error){
      alert('Username is already in use. Payment Cancelled')
    }
  }

  render() {
    return(
      <div>
          <StripeCheckout 
          stripeKey='pk_test_RvgjB6p1C1iQA1sZl8lHfCNz000oMKnrhO' 
          token={this.handleToken} 
          // billingAddress
          // shippingAddress
          amount={this.state.price * 100} 
          name={this.state.name}
          label='Create Account'
          />
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    user: state.users.data
  }
}

export default connect(mapStateToProps, {firstLogin})(withRouter(Stripe))

// export default class Stripe extends Component{    

//     render() {
//       return(
//         <div>
//           <StripeProvider apiKey="pk_test_RvgjB6p1C1iQA1sZl8lHfCNz000oMKnrhO">
//             <Elements>
//               <Form />
//             </Elements>
//           </StripeProvider>
//         </div>
//       )
//     }
//   }  
    

