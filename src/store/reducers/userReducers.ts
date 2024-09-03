import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions/userActions';
import { UserState } from '../../types';

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('token') || 'null'),
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
