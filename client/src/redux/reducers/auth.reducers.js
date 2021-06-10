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
    authenticating: false
}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break
        case authTypes.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                authenticate: true,
                authenticating: false
            }
            break
    }

    return state
}