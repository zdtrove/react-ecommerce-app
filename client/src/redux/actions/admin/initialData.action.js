import axios from "../../../helpers/axios"
import { categoryTypes, productTypes } from "../../types"

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post(`/api/admin/initialdata`)
        if (res.status === 200) {
            const { categories, products } = res.data
            dispatch({
                type: categoryTypes.GET_CATEGORIES_SUCCESS,
                payload: { categories }
            })
            dispatch({
                type: productTypes.GET_PRODUCTS_SUCCESS,
                payload: { products }
            })
        }
    }
}