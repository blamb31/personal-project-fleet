module.exports = {
    getCars: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            let cars = await db.get_cars(admin_id)
            let carList = cars.map( car => {
                delete car.admin_password
                return car
            })
            res.status(200).send(carList)
        }else{
            res.status(401).send("Please Log in")
        }
    },
    getCar: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: car_id} = req.params
            let cars = await db.get_car_by_id(admin_id, car_id)
            let carList = cars.map( car => {
                delete car.admin_password
                return car
            })
            res.status(200).send(carList[0])
        }else{
            res.status(401)
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


            carList = await db.delete_car_by_id(car_id, admin_id)
            res.status(200).send(carList)
        }else{
            res.status(404).send("Please Log in")
        }
    },
    
    updateCar: async (req, res) => {
        const db = req.app.get('db')

        if(req.session.user) {
            const {admin_id} = req.session.user
            const {id: car_id} = req.params
            const {
                driver_id, 
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
                
            let updatedCarInfo = {
                driver_id, 
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
                last_oil_change,
                car_id,
                admin_id
            }
            
            let updatedCarList = await db.update_car(
                driver_id, 
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
                last_oil_change,
                car_id,
                admin_id
            )

            let carList = updatedCarList.map( car => {
                delete car.admin_password
                return car
            })

            res.status(200).send(carList)


        }else{
            res.status(404).send("Please Log in")
        }
    }, 
    addMiles: async (req, res) => {
        const db = req.app.get('db')

        const {id: car_id} = req.params
        const {admin_id } = req.session.user
        const {miles} = req.body

        const updatedCar = await db.add_miles(car_id, admin_id, miles)
        res.status(200).send(updatedCar[0])
    },
    oilChange: async (req, res) => {
        const db = req.app.get('db')

        const {id: car_id} = req.params
        const {admin_id } = req.session.user
        const {miles} = req.body

        const updatedCar = await db.oil_change(car_id, admin_id, miles)
        res.status(200).send(updatedCar[0])
    },
    editCar: async(req, res) => {
        const db = req.app.get('db')

        const {
            driver_id, 
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
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: car_id} = req.params
            console.log(2, req.body, 3, admin_id, 4, car_id)
            let cars = await db.edit_car(
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
                last_oil_change,
                car_id)
            let carList = cars.map( car => {
                delete car.admin_password
                return car
            })
            res.status(200).send(carList[0])
        }else{
            res.status(401)
        }
    },
}

