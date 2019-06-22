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
    addCar: async (req, res) => {
        const db = req.app.get('db')
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {driver_id, 
                car_make, 
                car_model, 
                car_year, 
                car_color, 
                car_mileage, 
                car_img, 
                car_address, 
                car_zip_code, 
                car_city, 
                car_state, 
                last_oil_change} = req.body

            let newCarList = await db.add_car(
                driver_id, 
                admin_id, 
                car_make, 
                car_model, 
                car_year, 
                car_color, 
                car_mileage, 
                car_img, 
                car_address, 
                car_zip_code, 
                car_city, 
                car_state, 
                last_oil_change)

                let carList = newCarList.map( car => {
                delete car.admin_password
                return car
            })
            
            res.status(200).send(carList)
        }else{
            res.send("Please Log in")
        }
    },
    deleteCar: async (req, res) => {
        const db = req.app.get('db')
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: car_id} = req.params

            console.log(car_id, admin_id)

            carList = await db.delete_car_by_id(car_id, admin_id)
            res.status(200).send(carList)
        }else{
            res.status(404).send("Please Log in")
        }
    }
}