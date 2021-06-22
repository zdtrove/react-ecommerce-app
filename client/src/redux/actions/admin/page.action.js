import axios from "../../../helpers/axios"
import { pageTypes } from "../../types"

export const createPage = page => {
    return async dispatch => {
        dispatch({ type: pageTypes.CREATE_PAGE_REQUEST })
        try {
            const res = await axios.post('/api/page', page)
            if (res.status === 201) {
                dispatch({
                    type: pageTypes.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                })
            } else {
                dispatch({
                    type: pageTypes.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const getProductPage = payload => {
    return async dispatch => {
        try {
            const { cid, type } = payload
            const res = await axios.get(`/api/page/${cid}/${type}`)
            dispatch({ type: pageTypes.GET_PRODUCT_PAGE_REQUEST })
            if (res.status === 200) {
                const { page } = res.data
                dispatch({
                    type: pageTypes.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data
                dispatch({
                    type: pageTypes.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}