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
            res.send("Please Log in")
        }
    },
    getCar: async(req, res) => {
        const db = req.app.get('db')
        
        
        if(req.session.user){
            const {admin_id} = req.session.user
            const {id: car_id} = req.params
            console.log(car_id, admin_id)
            let cars = await db.get_car_by_id(admin_id, car_id)
            let carList = cars.map( car => {
                delete car.admin_password
                return car
            })
            res.status(200).send(carList[0])
            res.send(cars)
        }else{
            res.send("Please Log in")
        }
    }
}