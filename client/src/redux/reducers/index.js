import authReducer from './auth.reducer'
import { combineReducers } from 'redux'
import orderReducer from './order.reducer'
import productReducer from './product.reducer'
import categoryReducer from './category.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer
})

export default rootReducer