import { productTypes } from "../../types"

const initialState = {
	products: [],
	productsByPrice: {
		under5k: [],
		under10k: [],
		under15k: [],
		under20k: [],
		under30k: []
	},
	productDetail: {}
}

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case productTypes.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.payload.products
			}
		case productTypes.GET_PRODUCT_BY_SLUG:
			return {
				...state,
				products: action.payload.products,
				productsByPrice: {
					...action.payload.productsByPrice
				}
			}
		case productTypes.GET_PRODUCT_DETAIL_BY_ID_SUCCESS:
			return {
				...state,
				productDetail: action.payload.productDetail
			}
		default:
			return state
	}
}

export default productReducer