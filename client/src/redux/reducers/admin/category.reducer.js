const { categoryTypes } = require("../../types")

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildCategories = (parentId, categories, category) => {
    let newCategories = []

    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ]
    }

    for (let cat of categories) {
        if (cat._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: category.children
            }
            newCategories.push({
                ...cat,
                children: (cat.children && cat.children.length > 0) ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            newCategories.push({
                ...cat,
                children: cat.children ? buildCategories(parentId, cat.children, category) : []
            })
        }

    }

    return newCategories
}

const categoryReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case categoryTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories
            }
        case categoryTypes.ADD_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case categoryTypes.ADD_CATEGORY_SUCCESS:
            const { category } = action.payload
            const updatedCategories = buildCategories(category.parentId, state.categories, category)
            console.log(updatedCategories)
            return {
                ...state,
                categories: updatedCategories,
                loading: false
            }
        case categoryTypes.ADD_CATEGORY_FAILURE:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default categoryReducer