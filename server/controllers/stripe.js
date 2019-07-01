const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    pay: (req, res) => {
        // const db = req.app.get('db')
        const {token: id, amount } = req.body
        console.log(id, amount)
        stripe.charges.create(
            {
                amount,
                currencty: 'usd',
                source: id,
                description: 'Test Charge'
            },
            (err, charge) =>{
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                }
                else{
                    console.log('Successfule Payment", charge')
                    //db call goes here
                    return res.status(200).send(charge)
                }
            }
        )
    },
}