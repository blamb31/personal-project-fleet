module.exports = {
    getDrivers: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            let drivers = await db.get_drivers(admin_id)
            let driversList = drivers.map( driver => {
                delete driver.admin_password
                return driver
            })
            res.status(200).send(driversList)
        }else{
            res.status(401)
        }
    },
    getDriversInfo: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            let drivers = await db.get_drivers_info(admin_id)
            let driversList = drivers.map( driver => {
                delete driver.admin_password
                return driver
            })
            res.status(200).send(driversList)
        }else{
            res.status(401)
        }
    },
    getDriver: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: driver_id} = req.params
            let drivers = await db.get_driver_by_id(admin_id, driver_id)
            let driverList = drivers.map( driver => {
                delete driver.admin_password
                return driver
            })
            res.status(200).send(driverList[0])
        }else {
            res.send("Please Log in")
        }
    },
    addDriver: async (req, res) => {
        const db = req.app.get('db')
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const { 
                driver_first_name,
                driver_last_name,
                driver_phone,
                driver_img} = req.body

            let newDriverList = await db.add_driver(
                admin_id,
                driver_first_name,
                driver_last_name,
                driver_phone,
                driver_img)

                let driverList = newDriverList.map( driver => {
                delete driver.admin_password
                return driver
            })
            
            res.status(200).send(driverList)
        }else{
            res.send("Please Log in")
        }
    },
    deleteDriver: async (req, res) => {
        const db = req.app.get('db')
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: driver_id} = req.params

            driverList = await db.delete_driver_by_id(driver_id, admin_id)
            res.status(200).send(driverList)
        }else{
            res.status(404).send("Please Log in")
        }
    },
    editDriver: async (req, res) => {
        const db = req.app.get('db')

        if(req.session.user) {
            const {admin_id} = req.session.user
            const {id: driver_id} = req.params
            const {
                driver_first_name,
                driver_last_name,
                driver_phone,
                driver_img} = req.body
                
            let updatedDriverInfo = {
                driver_first_name,
                driver_last_name,
                driver_phone,
                driver_img,
                driver_id,
                admin_id
            }
            
            let updatedDriverList = await db.edit_driver(
                driver_first_name,
                driver_last_name,
                driver_phone,
                driver_img,
                driver_id,
                admin_id
            )

            let driverList = updatedDriverList.map( driver => {
                delete driver.admin_password
                return driver
            })

            res.status(200).send(driverList[0])


        }else{
            res.status(404).send("Please Log in")
        }
    }
}