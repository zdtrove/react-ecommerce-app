import { pageTypes } from "../../types"

const initialState = {
    error: null,
    loading: false,
    pages: {}
}

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case pageTypes.CREATE_PAGE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case pageTypes.CREATE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case pageTypes.CREATE_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case pageTypes.GET_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                pages: action.payload.page
            }
        default:
            return state
    }
}

export default pageReducer