import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import {getDriver, deleteDriver} from '../../redux/reducers/drivers'

class Driver extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getDriver(this.props.match.params.id)
    }

    handleChange(event){
        let {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleDeleteDriver = async (id) => {
        await this.props.deleteDriver(id)
        this.props.history.push('/user/admin/api/cars')
    }

    render(){
        console.log(44444444444, this.props)
        let {driver} = this.props
        return(
            <div>
                {this.props.user ?
                <div>
                    {this.props.driver &&
                    <div>
                        <div>
                            <h1>{`${driver.driver_id} - ${driver.driver_first_name} ${driver.driver_last_name}`}</h1>
                            <img width={200} src={driver.driver_img} />
                            <h3>{`Phone Number: ${driver.driver_phone}`}</h3>
                        </div>
                    
                        <div>
                            <button onClick={() => this.handleDeleteDriver(this.props.match.params.id)} >{`Delete ${driver.driver_first_name}`}</button>
                            <button onClick={ () => this.props.history.push(`/user/admin/api/drivers/edit/${this.props.match.params.id}`)} >Edit</button>
                            <button onClick={ () => this.props.history.push(`/user/admin/api/cars`)} >Back</button>
                        </div>
                    </div>
                    }
                </div>
                :
                    <Redirect to='/' />
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        user: state.users.data,
        driver: state.drivers.selected
    }
}

export default connect(mapStateToProps, {getDriver, deleteDriver})(Driver)