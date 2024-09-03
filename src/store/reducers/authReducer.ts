import { LOGIN_USER_SUCCESS, LOGOUT_USER } from '../actions/userActions';
import {AuthState} from "../../types";

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
};

const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { ...state, isAuthenticated: true };
        case LOGOUT_USER:
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};

export default authReducer;
