import axios from '../../../helpers/axios'
import { authTypes } from '../../types'

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
        const loginUrl = user.role === 'admin' ? '/api/admin/signin' : '/api/signin'
        const res = await axios.post(loginUrl, {
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
            const user = JSON.parse(localStorage.getItem('user'))
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
        dispatch({ type: authTypes.LOGOUT_REQUEST })
        localStorage.clear()
        dispatch({ type: authTypes.LOGOUT_SUCCESS })
        // const res = await axios.post(`/api/admin/signout`)
        // if (res.status === 200) {
        //     localStorage.clear()
        //     dispatch({ type: authTypes.LOGOUT_SUCCESS })
        // } else {
        //     dispatch({ type: authTypes.LOGOUT_REQUEST })
        // }
    }
}