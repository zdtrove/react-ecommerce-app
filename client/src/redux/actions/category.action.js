import axios from "../../helpers/axios"
import { categoryTypes } from '../types'

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryTypes.GET_ALL_CATEGORIES_REQUEST })
        const res = await axios.get(`/api/category`)
        if (res.status === 200) {
            const { categoryList } = res.data
            dispatch({
                type: categoryTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryTypes.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}