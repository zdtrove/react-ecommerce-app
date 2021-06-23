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
		const res = await axios.get(`/api/products/${slug}`)
		if (res.status === 200) {
			dispatch({
				type: productTypes.GET_PRODUCT_BY_SLUG,
				payload: res.data
			})
		} else {

		}
	}
}

export const getProductDetailById = payload => {
	return async dispatch => {
		dispatch({ type: productTypes.GET_PRODUCT_DETAIL_BY_ID_REQUEST })
		let res
		try {
			const { productId } = payload.params
			res = await axios.get(`/api/product/${productId}`)
			console.log(res)
			dispatch({
				type: productTypes.GET_PRODUCT_DETAIL_BY_ID_SUCCESS,
				payload: { productDetail: res.data.product }
			})
		} catch (err) {
			dispatch({
				type: productTypes.GET_PRODUCT_DETAIL_BY_ID_FAILURE,
				payload: { error: res.data.error }
			})
		}
	}
}