import Axios from 'axios'

const initialState = {
    data: null,
    loading: false
}

const GET_USER= 'GET_USER'
const GET_USER_PENDING= 'GET_USER_PENDING'
const GET_USER_FULFILLED= 'GET_USER_FULFILLED'

const LOGIN_USER= 'LOGIN_USER'
const LOGIN_USER_PENDING= 'LOGIN_USER_PENDING'
const LOGIN_USER_FULFILLED= 'LOGIN_USER_FULFILLED'
const LOGIN_USER_REJECTED= 'LOGIN_USER_REJECTED'

const LOGOUT_USER= 'LOGOUT_USER'
const LOGOUT_USER_PENDING= 'LOGOUT_USER_PENDING'
const LOGOUT_USER_FULFILLED= 'LOGOUT_USER_FULFILLED'

const REGISTER_USER= 'REGISTER_USER'
const REGISTER_USER_PENDING= 'REGISTER_USER_PENDING'
const REGISTER_USER_FULFILLED= 'REGISTER_USER_FULFILLED'
const REGISTER_USER_REJECTED= 'REGISTER_USER_REJECTED'

export default function (state = initialState, action) {
    let {type, payload} = action

    switch(type) {
        case GET_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_USER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        
        case LOGIN_USER_PENDING: 
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        case LOGIN_USER_REJECTED:
            alert("Username or Password is Incorrect")
            return {
                ...state,
                loading: false
            }

        case LOGOUT_USER_PENDING: 
            return {
                ...state,
                loading: true
            }
        case LOGOUT_USER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        
        case REGISTER_USER_PENDING: 
            return {
                ...state,
                loading: true
            }
        case REGISTER_USER_FULFILLED:
            return {
                ...state,
                data: payload.data,
                loading: false
            }
        case REGISTER_USER_REJECTED:
            alert("Username is already in use. Please choose another username.")
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export function getUser(){
    return {
        type: GET_USER,
        payload: Axios.get(`/auth/currentUser`)

    }
}

export function login(loginInfo) {
    return{
        type: LOGIN_USER,
        payload: Axios.post('/auth/login', loginInfo)
    }
}

export function logout() {
    return{
        type: LOGOUT_USER,
        payload: Axios.get('/auth/logout')
    }
}

export function register(newUserInfo) {
    return{
        type: REGISTER_USER,
        payload: Axios.post('/auth/register', newUserInfo)
    }
}