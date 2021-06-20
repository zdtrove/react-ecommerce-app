import axios from 'axios'
import store from '../redux/store'
import { authTypes } from '../redux/types'

const accessToken = localStorage.getItem('accessToken')

const axiosIntance = axios.create({
    headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    }
})

axiosIntance.interceptors.request.use(req => {
	const { auth } = store.getState()
	if (auth.token) {
		req.headers.Authorization = `Bearer ${auth.token}`
	}
	return req
})

axiosIntance.interceptors.response.use(res => {
	return res
}, err => {
	console.log(err.response)
	const { status } = err.response
	if (status === 500) {
		localStorage.clear()
		store.dispatch({ type: authTypes.LOGOUT_SUCCESS })
	}
	return Promise.reject(err)
})

export default axiosIntance