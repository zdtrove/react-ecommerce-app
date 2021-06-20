import axios from "../../../helpers/axios"
import { categoryTypes } from '../../types'

const getAllCategory = () => {
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
        console.log(category)
        dispatch({ type: categoryTypes.ADD_CATEGORY_REQUEST })
        try {
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
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateCategories = category => {
    return async dispatch => {
        const res = await axios.patch(`/api/category`, category)
        if (res.status === 201) {
            dispatch(getAllCategory())
        } else {
            console.log(res)
        }
    }
}

export const deleteCategories = ids => {
    console.log(ids)
    return async dispatch => {
        const res = await axios.delete(`/api/category`, {
            data: {
                ids
            }
        })
        if (res.status === 200) {
            dispatch(getAllCategory())
        } else {
            console.log(res)
        }
    }
}

export {
    getAllCategory
}