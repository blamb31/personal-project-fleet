const stripe = require('stripe')(process.env.STRIPE_SECRET)
const uuid = require('uuid/v4')


module.exports = {
    pay: async (req, res, next) => {
        // const db = req.app.get('db')
        
        console.log("Request:", req.body)
        
        const {product, token:{id}}  = req.body
            
        const charge = await stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            source: id,
            description: `Purchased ${product.name}`,
        },
        (error, charge) => {
            if (error) {
                console.error("The Error: ", error)
                return res.status(500).send(error)
            }else{
                console.log('Charge:' , charge)
                next()
            }
        })

}
}
