import Axios from 'axios'

const GET_DRIVERS = 'GET_DRIVERS'
const GET_DRIVERS_FULFILLED = 'GET_DRIVERS_FULFILLED'
const GET_DRIVERS_PENDING = 'GET_DRIVERS_PENDING'

const GET_DRIVER = 'GET_DRIVER'
const GET_DRIVER_FULFILLED = 'GET_DRIVER_FULFILLED'
const GET_DRIVER_PENDING = 'GET_DRIVER_PENDING'

const ADD_DRIVER = 'ADD_DRIVER'
const ADD_DRIVER_FULFILLED = 'ADD_DRIVER_FULFILLED'
const ADD_DRIVER_PENDING = 'ADD_DRIVER_PENDING'

const DELETE_DRIVER = 'DELETE_DRIVER'
const DELETE_DRIVER_FULFILLED = 'DELETE_DRIVER_FULFILLED'
const DELETE_DRIVER_PENDING = 'DELETE_DRIVER_PENDING'

const UPDATE_DRIVER = 'UPDATE_DRIVER'
const UPDATE_DRIVER_FULFILLED = 'UPDATE_DRIVER_FULFILLED'
const UPDATE_DRIVER_PENDING = 'UPDATE_DRIVER_PENDING'

let initialState = {
    data: [],
    selected: null,
    loading: false
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case GET_DRIVERS_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_DRIVERS_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false

            }

        case GET_DRIVER_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_DRIVER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false

            }

        case ADD_DRIVER_PENDING:
            return {
                ...state,
                loading: true
            }
        case ADD_DRIVER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false

            }

        case DELETE_DRIVER_PENDING:
            return {
                ...state,
                loading: true
            }
        case DELETE_DRIVER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false

            }

        case UPDATE_DRIVER_PENDING:
            return {
                ...state,
                loading: true
            }
        case UPDATE_DRIVER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false

            }
            
        default: 
            return state
    }
}

export function getDrivers() {
    return {
        type: GET_DRIVERS,
        payload: Axios.get('/api/drivers')
    }
}

export function getDriver(id) {
    return {
        type: GET_DRIVER,
        payload: Axios.get(`/api/drivers/${id}`)
    }
}

export function addDriver(newDriverInfo) {
    return{
        type: ADD_DRIVER,
        payload: Axios.post('/api/drivers', newDriverInfo)
    }
}

export function deleteDriver(id) {
    return{
        type: DELETE_DRIVER,
        payload: Axios.delete(`/api/drivers${id}`)
    }
}

export function updateDriver(id) {
    return{
        type: UPDATE_DRIVER,
        payload: Axios.delete(`/api/drivers/${id}`)
    }
}