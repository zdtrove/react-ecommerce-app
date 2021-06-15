import axios from "../../../helpers/axios"

export const addProduct = product => {
	return async dispatch => {
		const res = await axios.post(`/api/product`, product)
		console.log(res)
	}
}