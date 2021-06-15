import { combineReducers } from 'redux'
import authReducer from './admin/auth.reducer'
import categoryReducer from './admin/category.reducer'
import productReducer from './admin/product.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
})

export default rootReducer