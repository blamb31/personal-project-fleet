const {TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER, PERSONAL_PHONE_NUMBER} = process.env

module.exports = {
    sendSMS: (req, res) => {
        const {adminName, message} = req.body
        const client = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN)

        client.messages.create({
            body: adminName + ' sent: ' + message,
            from: TWILIO_NUMBER,
            to: PERSONAL_PHONE_NUMBER
        }).then( message => {
            console.log(message)
            //Do something with this info
            res.send(message)
        }).catch( err => {
            console.log(err)
            res.sendStatus(500)
        })
    }
}