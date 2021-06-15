import axios from "../../../helpers/axios"
import { categoryTypes } from '../../types'

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryTypes.GET_CATEGORIES_REQUEST })
        const res = await axios.get(`/api/category`)
        if (res.status === 200) {
            const { categoryList } = res.data
            console.log(categoryList)
            dispatch({
                type: categoryTypes.GET_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryTypes.GET_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCategory = category => {
    return async dispatch => {
        dispatch({ type: categoryTypes.ADD_CATEGORY_REQUEST })
        const res = await axios.post(`/api/category`, category)
        if (res.status === 201) {
            dispatch({
                type: categoryTypes.ADD_CATEGORY_SUCCESS,
                payload: { category: res.data.category }
            })
        } else {
            dispatch({
                type: categoryTypes.ADD_CATEGORY_FAILURE,
                payload: res.data.error
            })
        }
    }
}