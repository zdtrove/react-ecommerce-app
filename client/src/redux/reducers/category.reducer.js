const { categoryTypes } = require("../types")

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryTypes.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
        default:
            return state
    }

    return state
}

export default categoryReducer