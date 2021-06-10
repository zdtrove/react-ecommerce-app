import axios from '../../helpers/axios'
import { authTypes } from '../types'

export const signup = user => {
    return async dispatch => {
        dispatch({ type: authTypes.SIGNUP_REQUEST })
        const res = await axios.post(`/api/admin/signup`, {
            ...user
        })
        if (res.status === 200) {
            const { msg } = res.data
            dispatch({
                type: authTypes.SIGNUP_SUCCESS,
                payload: { msg }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authTypes.SIGNUP_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}

export const login = user => {
    return async dispatch => {
        dispatch({ type: authTypes.LOGIN_REQUEST })
        const res = await axios.post(`/api/admin/signin`, {
            ...user
        })
        if (res.status === 200) {
            const { accessToken, user } = res.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authTypes.LOGIN_SUCCESS,
                payload: {
                    accessToken, user
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authTypes.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            const user = localStorage.getItem('user')
            dispatch({
                type: authTypes.LOGIN_SUCCESS,
                payload: {
                    accessToken, user
                }
            })
        } else {
            dispatch({
                type: authTypes.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            })
        }
    }
}

export const signout = () => {
    return async dispatch => {
        localStorage.clear()
        dispatch({
            type: authTypes.LOGOUT_REQUEST
        })
    }
}