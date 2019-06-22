const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const authCtrl = require('./controllers/auth')

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log(`The DB is connected!`)
    app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`)
    )
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 
    }
})
)



app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentUser', authCtrl.currentUser)

// app.get('/api/cars', carsCtrl.getCars)