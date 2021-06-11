import { authTypes } from "../types"

const initialState = {
    accessToken: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    error: null,
    msg: '',
    loading: false
}

const authReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break
        case authTypes.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                authenticate: true,
                authenticating: false,
                loading: false
            }
            break
        case authTypes.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case authTypes.LOGOUT_SUCCESS:
            state = {
                ...initialState
            }
            break
        case authTypes.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break
        case authTypes.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case authTypes.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                msg: action.payload.msg
            }
            break
        case authTypes.SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        default:
            return state
    }

    return state
}

export default authReducer