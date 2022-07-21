import {
    REGISTER_USER,
    LOGIN_USER
} from '../Types';

const UserReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
            return {
                ...state,
                token:action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;