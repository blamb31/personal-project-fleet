const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, STRIPE_SECRET, AWS_ACCESS_KEY_PUBLIC, AWS_ACCESS_KEY_PRIVATE, S3_BUCKET, AWS_REGION} = process.env
const stripe = require('stripe')(STRIPE_SECRET)
const AWS = require('aws-sdk')


const authCtrl = require('./controllers/auth')
const carsCtrl = require('./controllers/cars')
const driversCtrl = require('./controllers/drivers')
const stripeCtrl = require('./controllers/stripe')
const twilioCtrl = require('./controllers/twilio')

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_PUBLIC,
    secretAccessKey: AWS_ACCESS_KEY_PRIVATE,
    region: AWS_REGION
})

const S3 = new AWS.S3()

app.use( express.static( `${__dirname}/../build` ) );

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log(`The DB is connected!`)
    app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`)
    )
})

app.use(express.json())
// app.user(cors())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 
    }
})
)

app.post('/api/s3', (req, res) => {
    const photo = req.body

    const buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ''), 'base64')

    const params = {
        Bucket: S3_BUCKET,
        Body: buf,
        Key: photo.fileName,
        ContentType: photo.fileType,
        ACL: 'public-read'
    }

    S3.upload(params, (err, data) => {
        console.log(222222, err)
        let response, code;
        if(err) {
            response = err;
            code = 500
        }else {
            response = data;
            code = 200
        }
        res.status(code).send(response)
    })
})

app.post('/auth/register', authCtrl.checkUser, stripeCtrl.pay, authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentUser', authCtrl.currentUser)
app.put('/auth/editUser/:id', authCtrl.editUser)

app.get('/api/cars', carsCtrl.getCars)
app.get('/api/cars/:id', carsCtrl.getCar)
app.post('/api/cars/', carsCtrl.addCar)
app.delete('/api/cars/:id', carsCtrl.deleteCar)
app.put('/api/cars/edit/:id', carsCtrl.editCar)
app.put('/api/cars/oilChange/:id', carsCtrl.oilChange)
app.put('/api/cars/:id', carsCtrl.addMiles)

app.post('/api/sendSMS', twilioCtrl.sendSMS )

app.get('/api/drivers', driversCtrl.getDrivers)
app.get('/api/driversInfo', driversCtrl.getDriversInfo)
app.get('/api/drivers/:id', driversCtrl.getDriver)
app.post('/api/drivers', driversCtrl.addDriver)
app.delete('/api/drivers/:id', driversCtrl.deleteDriver)
app.put('/api/drivers/:id', driversCtrl.editDriver)




