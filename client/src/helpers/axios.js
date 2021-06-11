import axios from 'axios'

const accessToken = localStorage.getItem('accessToken')

const axiosIntance = axios.create({
    headers: {
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
    }
})

export default axiosIntance