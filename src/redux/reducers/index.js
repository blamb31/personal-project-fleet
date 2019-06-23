import {combineReducers} from 'redux'

import drivers from './drivers'
import cars from './cars'
import users from './users'

export default combineReducers({
    drivers,
    cars,
    users
})