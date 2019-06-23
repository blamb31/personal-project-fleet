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

const LOGOUT_USER= 'LOGOUT_USER'
const LOGOUT_USER_PENDING= 'LOGOUT_USER_PENDING'
const LOGOUT_USER_FULFILLED= 'LOGOUT_USER_FULFILLED'

export default function (state = initialState, action) {
    let {type, payload} = action

    switch(type) {
        case GET_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_USER_:
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
        action: LOGIN_USER,
        payload: Axios.post('/auth/login', loginInfo)
    }
}

export function logout() {
    return{
        action: LOGIN_USER,
        payload: Axios.get('/auth/logout')
    }
}

export function register(newUserInfo) {
    return{
        action: REGISTER_USER,
        payload: Axios.post('/auth/register', newUserInfo)
    }
}