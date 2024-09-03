import api from "../utils/api";

export const loginUserApi = (credentials: { email: string; password: string }) => {
    return api.post('/api/users/login', credentials);
}
export const registerUserApi = (payload: { email: string; password: string }) => {
    return api.post('/api/users', payload);
}
