const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        //user inputs data: name, email, password
        //Check if email is in db, send 409 status
        // Create a salt
        // hash password and salt
        //store name email and hash into table
        try {
            const db = req.app.get('db')
            const {admin_first_name, admin_last_name, admin_username, admin_password, admin_phone, admin_img} = req.body
            
            console.log("Hit1")

            let users = await db.get_admin_by_username(admin_username)
            let user = users[0]
    
            if(user) {
                return res.status(409).send('Email already in db')
            }
            console.log("Hit2")
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(admin_password, salt)
            console.log("Hit3")
    
            let response = await db.add_admin({
                admin_first_name,
                admin_last_name,  
                admin_username,
                admin_phone,
                admin_img, 
                admin_password:hash})
            let newUser = response[0]
            console.log("Hit4")
    
            delete newUser.admin_password
            console.log("Hit5")
    
            req.session.user = newUser
            console.log("Hit6")
    
            res.send(req.session.user)

        }catch(error){
            console.log('there was an error', error)
            res.status(500).send(error)
        }

    },
    login: async (req, res) => {
        //user inputs data: email, password
        //get user by email from db
        //if no user, send 401 status
        //compare password with hash using bcrypt
        //if password doesnt match, send 401 status
        //if the match, add user to session
        try {
            const db = req.app.get('db')
            const {admin_username, admin_password} = req.body

            let users = await db.get_admin_by_username(admin_username)
            let user = users[0]

            if(!user){
                return res.status(401).send('Username or Password is incorrect')
            }

            let isAuthenticated = bcrypt.compareSync(admin_password, user.admin_password)

            if(!isAuthenticated){
                return res.status(401).send('Username or Password is incorrect')
            }

            delete user.admin_password
            req.session.user = user
            res.send(req.session.user)

        }catch(error){
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send("Logged Out")
    },
    currentUser: (req, res) => {
        if(req.session.user){
            res.send(req.session.user)
        }else{
            res.status(404).send('No User is logged in')
        }
    }

}