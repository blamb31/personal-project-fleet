import React, {Component} from 'react'
import Axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import DotEnv from 'dotenv'

export default class Stripe extends Component{
    constructor(props) {
        super(props)

        this.state = {
            amount: 0
        }
    }

    onOpened = () => {
        console.log('This is opened')
    }
    
    onClosed = () => {
        console.log('This is closed')
    }

    onToken = token => {
        console.log(token)
        let {amount} = this.state
        amount /= 100
        console.log(amount)
        token.card = void 0
        Axios.post('/api/payment', {token, amount}).then( res => {
            console.log(res)
            alert(`Congratulations You paid ${amount}!`)
        })
    }

    render() {
      return(
        <div>
          stripe
        </div>
      )
    }
  }
    

