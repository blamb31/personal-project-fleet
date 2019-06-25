import Axios from 'axios'

const GET_CARS = 'GET_CARS'
const GET_CARS_FULFILLED = 'GET_CARS_FULFILLED'
const GET_CARS_PENDING = 'GET_CARS_PENDING'
const GET_CARS_REJECTED = 'GET_CARS_REJECTED'

const GET_CAR = 'GET_CAR'
const GET_CAR_FULFILLED = 'GET_CAR_FULFILLED'
const GET_CAR_PENDING = 'GET_CAR_PENDING'

const ADD_CAR = 'ADD_CAR'
const ADD_CAR_FULFILLED = 'ADD_CAR_FULFILLED'
const ADD_CAR_PENDING = 'ADD_CAR_PENDING'

const DELETE_CAR = 'DELETE_CAR'
const DELETE_CAR_FULFILLED = 'DELETE_CAR_FULFILLED'
const DELETE_CAR_PENDING = 'DELETE_CAR_PENDING'

const UPDATE_CAR = 'UPDATE_CAR'
const UPDATE_CAR_FULFILLED = 'UPDATE_CAR_FULFILLED'
const UPDATE_CAR_PENDING = 'UPDATE_CAR_PENDING'


let initialState = {
    data: [],
    selected: null,
    loading: false
}

export default function (state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case GET_CARS_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_CARS_FULFILLED:
            console.log(5555555, type)
            return {
                ...state,
                data: payload.data,
                loading: false

            }
        case GET_CARS_REJECTED:
            console.log(6666666666, type)

            return {
                ...state,
                data: [],
                loading: false

            }

        case GET_CAR_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_CAR_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false

            }

        case ADD_CAR_PENDING:
            return {
                ...state,
                loading: true
            }
        case ADD_CAR_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }

        case DELETE_CAR_PENDING:
            return {
                ...state,
                loading: true
            }
        case DELETE_CAR_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }

        case UPDATE_CAR_PENDING:
            return {
                ...state,
                loading: true
            }
        case UPDATE_CAR_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }

        default: 
            return state
    }
}

export function getCars() {
    return {
        type: GET_CARS,
        payload: Axios.get('/api/cars')
    }
}

export function getCar(id) {
    return {
        type: GET_CAR,
        payload: Axios.get(`/api/cars/${id}`)
    }
}

export function addCar(newCarInfo) {
    return{
        type: ADD_CAR,
        payload: Axios.post('/api/cars', newCarInfo)
    }
}

export function deleteCar(id) {
    return{
        type: DELETE_CAR,
        payload: Axios.delete(`/api/cars/${id}`)
    }
}

export function updateCar(id) {
    return{
        type: UPDATE_CAR,
        payload: Axios.delete(`/api/cars/${id}`)
    }
}