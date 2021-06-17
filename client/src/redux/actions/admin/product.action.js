import axios from "../../../helpers/axios"
import { productTypes } from "../../types"

export const addProduct = product => {
	return async dispatch => {
		const res = await axios.post(`/api/product`, product)
		console.log(res)
	}
}

export const getProductsBySlug = slug => {
	return async dispatch => {
		const res = await axios.get(`/api/product/${slug}`)
		if (res.status === 200) {
			dispatch({
				type: productTypes.GET_PRODUCT_BY_SLUG,
				payload: res.data
			})
		} else {

		}
	}
}