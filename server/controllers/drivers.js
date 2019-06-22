module.exports = {
    getDrivers: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            console.log(req.session.user)
            const {admin_id} = req.session.user
            let drivers = await db.get_drivers(admin_id)
            console.log(33333333, drivers)
            // let driversList = drivers.map( driver => {
            //     delete driver.admin_password
            //     return driver
            // })
            res.status(200).send(drivers)
        }else{
            res.send("Please Log in")
        }
    },
    getDriver: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: driver_id} = req.params
            console.log(driver_id, admin_id)
            let drivers = await db.get_car_by_id(admin_id, driver_id)
            let driverList = drivers.map( driver => {
                delete driver.admin_password
                return driver
            })
            res.status(200).send(driverList[0])
        }else{
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
    }
}