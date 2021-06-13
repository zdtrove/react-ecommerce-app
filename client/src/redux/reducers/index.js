import authReducer from './auth.reducer'
import { combineReducers } from 'redux'
import categoryReducer from './category.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer
})

export default rootReducer