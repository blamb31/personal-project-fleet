import React, {Component} from 'react'
import Axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import {toast} from 'react-toastify'


toast.configure()
export default class Stripe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'Create Admin',
      price: 15.00
    }
  }

  handleToken = async (token) =>  {
    console.log(token)
    const response = await Axios.post('/api/payment', {
      token, 
      product: this.state
    })
    const {status} = response.data
    if (status === 'succeeded'){
      alert('Success!')
    }else{
      alert('Something went wrong!')
      
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
          label='Create Account'/>
      </div>
    )
  }
}

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
    

