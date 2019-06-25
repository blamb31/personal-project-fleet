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
            const {admin_first_name, admin_last_name, admin_username, admin_password, admin_phone, admin_img, admin_company_name} = req.body
            console.log(3333333, admin_first_name, admin_last_name, admin_username, admin_password, admin_phone, admin_img, admin_company_name)

            let users = await db.get_admin_by_username(admin_username)
            let user = users[0]
    
            if(user) {
                return res.status(409).send('Username already in use')
            }
            
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(admin_password, salt)
    
            let response = await db.add_admin({
                admin_first_name,
                admin_last_name,  
                admin_username,
                admin_phone,
                admin_img, 
                admin_password:hash,
                admin_company_name
            })
            let newUser = response[0]
    
            delete newUser.admin_password
    
            req.session.user = newUser
    
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
            console.log("hit")
            const db = req.app.get('db')
            const {username: admin_username, password: admin_password} = req.body
            
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
            console.log(5555555555555, req.session.user)
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