import axios from "axios"

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/'
const API_KEY = 'AIzaSyAxB4-mW3zMs25IFsQoBRPyUP9EIuJQUio'

export const signupWithEmailAndPassword = (details, callback) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}accounts:signUp?key=${API_KEY}`, {
                email: details.email,
                password: details.password,
                returnSecureToken: true
            })
            dispatch({
                type: 'SIGNUP',
                payload: response.data
            })
            return callback(response.data)
        }
        catch (error) {
            return callback({
                error: true,
                response: error.response
            })
        }
    }
}

export const loginWithEmailAndPassword = (details, callback) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}accounts:signInWithPassword?key=${API_KEY}`, {
                email: details.email,
                password: details.password,
                returnSecureToken: true
            })
            dispatch({
                type: 'LOGIN',
                payload: response.data
            })
            return callback(response.data)
        }
        catch (error) {
            return callback({
                error: true,
                response: error.response
            })
        }
    }
}