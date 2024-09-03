export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const logoutUser = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
};

export const registerUser = (userData: any) => ({
    type: REGISTER_USER,
    payload: userData,
});

export const registerUserSuccess = (userData: any) => ({
    type: REGISTER_USER_SUCCESS,
    payload: userData,
});

export const registerUserFailure = (userData: any) => ({
    type: REGISTER_USER_FAILURE,
    payload: userData,
});

export const loginUser = (credentials: any) => ({
    type: LOGIN_USER,
    payload: credentials,
});

export const loginUserSuccess = (user: any) => {
    localStorage.setItem('token', JSON.stringify(user));
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user,
    };
};

export const loginUserFailure = (error: string) => ({
    type: LOGIN_USER_FAILURE,
    payload: error,
});
