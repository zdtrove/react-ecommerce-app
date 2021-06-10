import axios from '../../helpers/axios'
import { authTypes } from '../types'
export const login = user => {
    console.log(user)
    return async dispatch => {
        dispatch({ type: authTypes.LOGIN_REQUEST })
        const res = await axios.post(`/api/admin/signin`, {
            ...user
        })
        console.log(res)
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