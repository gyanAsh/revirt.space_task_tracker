import {
    REGISTER_USER,
    LOGIN_USER,
    GET_USER
} from '../Types';

const UserReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token',action.payload)
            return {
                ...state,
                token:action.payload
            }
        case GET_USER:
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;