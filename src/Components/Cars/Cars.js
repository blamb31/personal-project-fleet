import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {getCars, addCar, deleteCar} from '../../redux/reducers/cars'
import {getDrivers} from '../../redux/reducers/drivers'

class Cars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            driver_id: null, 
            car_make: '', 
            car_model: '', 
            car_year: '', 
            car_color: '', 
            car_mileage: '', 
            car_img: '', 
            car_address: '', 
            car_zip_code: '', 
            car_city: '', 
            car_state: '', 
            last_oil_change: null

        }
    }

    componentDidMount = async () => {
        await this.props.getCars()
        await this.props.getDrivers()
    }

    handleChange(event){
        let {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleDeleteCar(id){
        this.props.deleteCar(id)
    }

    handleAddCar = () => {
        for( let key in this.state) {
            if(!this.state[key]){
                return alert('Please fill in all fields')
            }
        }
        this.props.addCar(this.state)
        this.setState({
            driver_id: 0, 
            car_make: '', 
            car_model: '', 
            car_year: '', 
            car_color: '', 
            car_mileage: '', 
            car_img: '', 
            car_address: '', 
            car_zip_code: '', 
            car_city: '', 
            car_state: '', 
            last_oil_change: 0
        })
    }

    render() {
        
        console.log(this.props)
        let {cars, drivers} = this.props
        let car;
        let driver;
        if(this.props.user){
            car = cars.map( (car, index) =>{
                if(index %2 ===0){
                    return(
                        <tr style={{background:'white'}} key={index}>
                            <td><img onClick={() => this.handleDeleteCar(car.car_id)} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAADkCAMAAAArb9FNAAAAkFBMVEUAAADt7e3+/v7////s7Ozw8PD19fX4+Pj6+vry8vLn5+eEhISOjo7j4+PPz8/m5ubX19fIyMi3t7fY2Njf39+VlZUuLi5iYmIVFRUODg7BwcGqqqonJyefn59ZWVlBQUFycnIdHR15eXk5OTlLS0tubm5NTU1hYWGRkZGbm5sqKiqAgIBERESwsLA1NTUhISHDMUWRAAASpUlEQVR4nO1diVLjuhKNLMmxA1kJARKWAAPcAQL//3fPa9wt28qRlyRT9XrunamKym0da+tN3QNJyROUfNbms7aAtWnapFlTwB4bsraQtXmsjTWFrGlo6QlnOZAeJUWalE/bpM/aAvoU74pmLAMLy5C1sY6wnkToaNOQPTZkPWHf2YZOGOhokwM6Uc+SfWgYnTF2/0f3z6JzmZmWrhi7yrmgi3aVWpYHxs62Zx4NnXLbMykEA938gtIlJdZycU0/5zHGbl3XlUujlw+6AGigu/oegHTtFU8eAd3sHu3YhnA10OnJJ8zliOj80RParf8sM1OIhzuQzf14/2jP6JRQFyi4xzHlWdpVcEYfKn/WAR1tMiWx2rEL/6J9epqwI6GETo/hpXeZLz0LOtmBJKbnt2CPbhfGicBYBlrrcL1C4a3zvmpKYYllQezo9XzWxtERfleP8PcOQsZyIJQS6Z/o86Xi/QJl9jOPd1+lFBPvvYijyP9T/Kjy92+LnzMUDZX1Im4SpOEL7U+06KLpRJ4clCeV9LYou5uxtk8qU8ywiXNciCq2LPxjrzVfvFXoPDmCp8JF1ZJhLLnyYhPnqtHJCbxQdjruCZUyKtHJCcrwOV3GjCc8dgg6OYS/9FaZ37kSXQRvg7J8jbfghjMTQCcD/IBalnpSjS7qxQvK9Gak+0S3QA+Du3n8PIQuWnrvKLxY9OkLnZyhi+7uIVkiGDpPwifob7T0ekInww/0G79MhQs6+YAy/lwa6BjLFuhkcI324Ts9mlB00WYFL723sSnOdYQOPunu15kEBq676L/pD8j77roPdFKOX1F01/krbegURefJNawxzhk8Jhs3Rydu0Ne/FG+sR6cUF+99eNo/jmpOc2WiY23cOKOZSicl/PanWSoPxiyZWCEHISU/oDQM39AXbEOveM7KktKQtbGmMFij716tffIYowET09PPnn3DSBlbwgr/g86fU4YfgY0WN7OFrI37ESawmvlAH+QTwNRe6ZqJugKfevfr/bIxdXPOkk6ceu1V+vBJ9xbpUdXT+7A9E578f2Y5vA7sKtKDT9vvJV+87HUHLO1S40svf7YLdPh2vQ6ao/PkGF96naGTU/ill2EbdNFnRF+0mofdoJMBrqEsxbAVOg82t70udRfoXN54pVt6uKSAt6+LUSfo5k5W9Zb+OzlGBc7B37A9OjmCxctYtWztWcYV5OfYDtEOnRw6GPhiLK3RebjAGS2EhugyARjXK39Sq3prz7IcwnaIL9XOjyAnqJfmdpM+dgBd/sfL5cx8qkSyStoUSX3wWtjpVM7M2QZUuIv9CDG/jK0hicW/T3FT6ih9LCj675XkzCEjn1HxewCryavJ0MLywNsCf4u+50MND7McUCG3RrxPzPv4ARumroDs2bIfoXid6UcQGraj/kwKlsYEsPsR9kS973oJn3qXSpBP5qKbawfxUlayRK1GBjqh57/gi28XdGnD6Dytx/Dm9SK7RSeCBbqb/czJZoiii2bmaIuCu9m7fbtCNxzizutRMXoOM3MDHwYzWcOyOTopcB9ok3WHi5c7WceyBTo5ewZf/7zbz014Zobwt/tKlR7ZMToJz53VVT43QXRyeImC+x7Xs2yBzqULN0vthm6Hcr43bA2dofOkwo3fTujkGPYfX5sxv52hi4RcWNfLQkcgdFLhrixljRu1oFMGOmZMTdF5sKz0nZgALX4EtUcnJTzjY1sDVzQ4SxPdYTkzbcvD0bdoR27GokLOpB9sL2fClqnPtRaGQZuzNORMTEco2oazP2hX/gaYjjCc4VZF30ntGLDYHM9QxirF+zUqcN7PkwlAeJb8CIkuMYZPurdktIdWRYMG5TrERe9tzbBB7k90MgXV6n7CMtNe4UX3npx09qhvBz9C1epVeoxb340Yvyq7il6gElDmBO05Yl/PYO/T5qDVSONnzLU8Brroc6MdWk1skz1Cp0fwRHjLI3R6v20BL73VSNezjG0U8KJ7yr3XvaNzWHqZ6aoGXYgvukVhf+x77PQIt77rWpahuILFy7/e8dAJDz71nue6luV4i4K7KSS6ftEl0b0e7vt9nOk6lvCi+yH+4+a3nOCxC2SAB8sUS48LwHOUw/OCdOUIMzPw5BUsHW50FUsHq/pl0BQdpZIfoUYWT6W7OWqH+J3rLBQoZekl/wdbFNy7yB5KyS5nkiZhjzWqb4vDe3zY0/ahvBJLH9YUVxNb+JLP2nj4kkV7lcbtWVMAjgROeOl9pfs5nQD4Sbe2Xkgx/Qi0zdHyUKCLZ5qew4G9md1/v3j1ElYTXzxpEVa9Du0qBF1MIWx9X00k3ZocxMvYqm5TNPpD53J1LN72iq7Ap+VzbFU/ETqxhHf169hJmnUlXLtdYjwVOvyy5e1ij85h0V0MT4lO6Ac03GM1zi8+j+Cj5D1Ve06GzkFDuxFpV/CrkPezxN1/QnQaDz1/SIQoDbuS4rBZ77RjJ8I5rOutI5b6CvYfX+Rn8wnRCeFkfdfwotvbGrpBd9iPUI1OwKfezRIP2lgVtxzM0HGGjlvaDXSq8CSU/Aj7gBXiR8jNyPsY9ugx/LLlf3jU0sbjPcneaAbG5zbyNBzf8CMwsPyCMVM1jQvGPBgjhH3et7BSeCOK+8f8GvTQcg3auLNsaK9GUBebAUyrYjNAhLBkhdI3sVcYbjKu3xmRwzZLO1tNLnmNptuO0S1oT06dG0fjV94h+su2rVOjExr2MCL0pjV1m54cncBDhQ5TdNKxXp4eXZdLbyFtVxRPgk4v4aPsAMVW9XNDJ8IFHOllpbcYzNmhE6qTU2+1lOc4dhHBtqB6uk2t6ii65n4E9hySLU1PYEGrljKrOkfH3tbJ2DXJwRiuYc20hh4zl4Ft7LgV2YqO+xEolWRxQtx6L7JfhUN4RjXlseq8J0YuOEtPNG0SpvbKNCA+A7gGxNqI3oFn96ikXf7xLT2xZeBziNi3+RHoY+xSJ25mqaCX/cxiPXHwI7B52tDy4NUnOsMdX2V6XNagM8aOtjW2q7CVjY1dfFQ1Xnr3xMVeP3bHthoZuXGWsOPLoAey450tOj2DTYCMvmhoy9miU3qDWt8pfV/Rw+p80QkBX7Ys6H7OeJ4tuuiXKezk2dMDFzPOGV3oLHBeBP8IuqQr8O2JlJ5UXR6/k6OrzLjldOp9zmXv6CwRHSU/Qr31PkUXwmFSMcVWdYpO1aNz8iNYEnviFm2OLuGEuxYGcay6nWVTD0Apkkrt04VWeCPSxioNKM0SmvyTKBp4orOI7hZh6aIESyNqakDp29LGUiRV3g9lzfzj4keg6yKe3hIO30zoUZVTHVKWVj8C60nbiP1KdJR0fCneUUW/GP07OfbdVdj4suW/gs77zxHcYPA7Mbam80XndBhk5JDq8ITolAjxSCJKlyz48EzRCYGH73FaS1nXk/NBh1/xMuh7ev7odHN77ZaCOEt0DpFEZXogc/MM/QjRomtqMYrpbl6Hjr2t4diVIvYZOiNin6Hbx+a083FlAYvSQFeK6KjviSGJ8XSacGR89WO+m3hZpkhZ6DLFKHojW9VGUtF70H6jk45SkmhKCWX4EehdXUskVelGNpun7SwP0oej4WrpM69OgVraj2ZXwVN4WOgpcyX0j87NjyCXbT2TCX2pCnQnt4lJ1VEs1cMZomvh+jHoPsnPd2bo4FvaB+k9diicFTqHu4aH6UKdF7rOFl1Km1Awdei06BzSv0C0mlhKcx7f0r5u4rCz0Meye3RmxD6GTkVqT4eLLqWL+plpy9pkyfxjVhAw5UyGjr5vBOdcukGjAO+oHaKUyp6h434E1jY4nOvnYJPG7zkp+K7F0yzAMhJZmiorCBQzgMvitK2w3nsSzj35PA+GWxTeRzwU2dtKfoTKnmR+BLJkzIh9+iDmR5AKrk63075Dja/r4n0n8yM4WNW/RsJ3SH9wX2QZPZXVyCGX9PtYJ8kA8YTQ++skJ0MH53dexdUvkpILWxTednpadBJPNbvJWUqBp4wRqUXh6OhS4xWe33kb7llK2KB7u65KdXiksXOok/eerqE01zfudn5Po6tOg26ODsJvGpuYiRlyCNt0t1mqw+Ojc1B7slyhuRAl8SjApK5dL5Z2i7QaxNIf7Mra5/5JjPfSZekN4q32yGMXZ/7BU82+7g+uouQCnv4iWnrN0ZXlzFy6OyBnwslVbtf5ZTrCEi9LuFVm9XZczoR1BEMyHyo8S6hfwXKI38HfNdURhu6ZXbNPP4Uvxb+QL19MAIVHAb5OEN0lnXYs12lzywNcB/2V1sZjixfP1MHtHP3bVa5gcYMlOmOpDnE37fVR0TmcdNRbbKY6hD/R3eaI6ByCid6V5VjBcwH+zMjk7Bedw0n3NLEKPAFskSF3aPpGhxds3NkzmTvkff/vSGPnUKr00hQzSgLPBC/5UJnqsGt0DtUa4+l0AB2+9FJxTvWNDraqr+YlAbgsiuMmwLeslnKf6FzSZpaVl3JIj8SvnVyGrdABFQSkh+ddjNWewxUE8BDqu6TqasnSTllWZP6h6A7JmQEcwfe4FKJkRvYVTTSUVGp1qDX+nficYTlTSrdYI3+I15KaeAcDg9LwJR83T29BljkAM07MErEfu7JmcP6inUxLwZUqxBGWYdrmlPddHooTIz4tt8w/Gk8ycpE/bM1Cn/XEJe+7PKCbN/MjJMoLLF5+x5uJPIgutwPgPrLvkezJrhKuUZ3ukyQ6s6PLBg+vP3fRl9XoCj6ZNp4bOqFhiexu0wu6oVNJi/1zYM3QEL4IfD8xMjR0g65ZUW60Iipup3kcMR9qN+jgQu7PExauAKLTU7ycEyu50AU6h+J319IdnYqXHiyR7ehn6QCdQ1HutxFjidfqxQse35J8EC39COlf8Hn7Oglt6FhXjIClwCUNZ3djJ/HSaXcLjYd4mbV68dn/haKjlMqZmc2fyOJ4rPqlMhPsWMLRjYvP0UeEfc4LnWsF9goCh+8sh3i+8jdhv2BsvwYd4mk4n/ZlQ613lulA1t03h63q98k1LMs1ENuFlGRS4cnpc0dny8w/eoYmK79LS5UylnyPsVcijo8FWBnKjdztIvY1nmg+q9ljuX51CJ3QsNCQOSha3kfAM5X/yZC0QeemDLVBlxxVIe5mu8qeboVOTPFa43FcViuLn8bzO+9dWe3QOWRFSuwQLdBpPL/UPql6S3QOlcee17LV2Gk8NKFwZbVEJxRs4HgaNUYX6cAaFmw/idrTFp1LJR6/OTqHdJg77EIuhC5aeg4lF5qiCwSuUFKxozU6gScku1s2zfzj464sptOBkphStegcbIvvNMdahR8hzc6vRMmPgBeLn5cUDZXn2Cn5Efapd6oK0ar8ObzC7UsCK3ub6UfglnY6S2dwGaoNU0PN6U3JppsTQ1rUsWZL3mBZn/lntIW/ns8mlam92vwIdA6zzyzxUKSfGUGHWtrxoqe6lD2GokPHzkwop2GJjBy1oOUBTx78GwkM3aOTyqEmQZGaBUPnEOX04PWDLlKGUBNgEa0FodN4qdK3uHhY9+jinoTw/fVVvvQgdLh9I1F7ekLnoAx9ZNIEgk7DaYNvE1dWX+g0fpcjy38OoHNez32hExqOjXleo+jEFgX3lspZvaFzMMf9pnXrD6LTDrHq2WzvDx3uqU+yIlnQyaQreo2XRMt3KhwdbQJSjAqNxxP+jUMsrGMX+9Fwq7o8jM5aqrVWEvPIyYuXA5mX0TGWgdC4ge+jUHu4nGmwpGTY1i1jt+eGi4TvS8lZ6kGeaDP5K9KAdriLVaeJQk29wyNajpnY01c0e2c5sec+NSnJ/OPh1veptYJAKMd4zXniOa2eVBlLOhdtBTLqsvI6RBU+cDePiU7DJ90FVWyqJ1UZ3UE/QhU6h9untwsbOjwH3+uSDgI+do3Q4Tky/jATCEeHW9VXLKl6z+iiJvwuXFLwuAqdg1V9w7rSNzrPgz3bgx01YBB0Dlb1lwAQM7pBl/wb6F2DEDWODp7d71NEiOps7GIZCndux+GFuZSRoYujYeAIvt+5PCq6RMrAfaSXQXndOVjVN/Lo6JRDMe60aDhDp/ELIjf+8dHFv8D2gt+xMTOFckhGITHxPuXbHTpcAs4N/zk6vYATDM6TMPuDFQTyJqsfgR9qLJDGVDSiRlwZyjylcpAFt4vpKCYW2SJGlFSe2h/OFXowsSdr8nhiT481pr+pKetJSor1UqTxQxlLI5KKTQ4e9jSkX72ygkDqbKm6spFdsaiIpCJlCWoqCIhSBQGuVPGe5CsmddRYKgiAmX/itlIFAbpk6lnatFf22HlVEGDo6lk23HhPnWP/H0DXpDJjBTo8PhNEZ9bls6JDdxXzyirbVTi6+i3A2FVYG99VWJOR58HSE47uf7tSnajl7MD1AAAAAElFTkSuQmCC' style={{width:20}} /></td>
                            <td>{index + 1}</td>
                            <td>{car.car_id}</td>
                            <td>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</td>
                            <td>{car.car_mileage}</td>
                            <td>{`${car.car_city}, ${car.car_state}`}</td>
                            <td>{car.driver_id}</td>
                            <td>{`${car.driver_first_name} ${car.driver_last_name}`}</td>
                            <td><Link to={`/user/admin/api/cars/${car.car_id}`}>View Details</Link></td>
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'gray'}} key={index}>
                            <td><img onClick={() => this.handleDeleteCar(car.car_id)} src='data:image/png;base64,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' style={{width: 20}} /></td>
                            <td>{index + 1}</td>
                            <td>{car.car_id}</td>
                            <td>{`${car.car_year} ${car.car_make} ${car.car_model} (${car.car_color})`}</td>
                            <td>{car.car_mileage}</td>
                            <td>{`${car.car_city}, ${car.car_state}`}</td>
                            <td>{car.driver_id}</td>
                            <td>{`${car.driver_first_name} ${car.driver_last_name}`}</td>
                            <td><Link to={`/user/admin/api/cars/${car.car_id}`}>View Details</Link></td>
                        </tr>
                    )
                }
            })
        }
        if(this.props.user){
            driver = drivers.map((driver, index) => {
                if(index % 2 === 0){
                    return(
                        <tr style={{background:'white'}} key={index}>
                            <td>{driver.driver_id}</td>
                            <td>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                        </tr>
                    )
                }else{
                    return(
                        <tr style={{background:'gray'}} key={index}>
                            <td>{driver.driver_id}</td>
                            <td>{`${driver.driver_first_name} ${driver.driver_last_name}`}</td>
                        </tr>
                    )
                }
            })
        }
        return(
            <div>
                
                <div>
                    <div>
                        <p>Driver ID:</p>
                        <input 
                        type='number' 
                        placeholder='Driver ID' 
                        value={this.state.driver_id} 
                        name='driver_id' 
                        onChange={event => this.handleChange(event)} />
                    </div>
                    <div>
                        <input 
                        type='text' 
                        placeholder='Car Make' 
                        value={this.state.car_make} 
                        name='car_make' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Model' 
                        value={this.state.car_model} 
                        name='car_model' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Year' 
                        value={this.state.car_year} 
                        name='car_year' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Color' 
                        value={this.state.car_color} 
                        name='car_color' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Mileage' 
                        value={this.state.car_mileage} 
                        name='car_mileage' 
                        onChange={event => this.handleChange(event)} />
                        
                        <input 
                        type='text'
                        placeholder='Car Image' 
                        value={this.state.car_img} 
                        name='car_img' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car Address' 
                        value={this.state.car_address} 
                        name='car_address' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car Zip Code' 
                        value={this.state.car_zip_code} 
                        name='car_zip_code' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car City' 
                        value={this.state.car_city} 
                        name='car_city' 
                        onChange={event => this.handleChange(event)} />
                    
                        <input 
                        type='text'
                        placeholder='Car State' 
                        value={this.state.car_state} 
                        name='car_state' 
                        onChange={event => this.handleChange(event)} />
                        <div>
                            <p>Mileage At Last Oil Change: </p>
                            <input 
                            type='number'
                            placeholder='Mileage At Last Oil Change' 
                            value={this.state.last_oil_change} 
                            name='last_oil_change' 
                            onChange={event => this.handleChange(event)} />
                        </div>
                        <button onClick={this.handleAddCar}>Add New Car</button>
                    </div>


                </div>
                {(this.props.user) ?
                    <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                        <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                        <h3>Drivers In The Fleet</h3>
                            <table>
                                <tr style={{background: 'gray'}}>
                                    <th>Driver ID</th>
                                    <th>Driver Name</th>
                                </tr>
                                {driver}
                            </table>
                        </div>
                        <div style={{display: 'flex',flexDirection: 'column', justifyContent:'center'}}>
                            <h3>Cars</h3>
                            <table>
                                <tr style={{background: 'gray'}}>
                                    <th></th>
                                    <th></th>
                                    <th>Car ID</th>
                                    <th>Car Info</th>
                                    <th>Car Mileage</th>
                                    <th>Car Location</th>
                                    <th>Driver ID</th>
                                    <th>Driver Info</th>
                                    <th></th>
                                </tr>
                                {car}

                            </table>

                        </div>
                    </div>
                :
                    <Redirect to='/' />
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    console.log(55555,)
    return {
        user: state.users.data,
        cars: state.cars.data,
        drivers: state.drivers.data
    }
}

export default connect(mapStateToProps, {getCars, addCar, deleteCar, getDrivers})(Cars)