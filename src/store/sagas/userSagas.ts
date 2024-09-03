import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {loginUserApi} from "../../api/userApi";
import {LOGIN_USER, loginUserFailure, loginUserSuccess} from "../actions/userActions";

function* loginUserSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(loginUserApi, action.payload);
        yield put(loginUserSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(loginUserFailure(error.message));
        } else {
            yield put(loginUserFailure('An unknown error occurred'));
        }
    }
}

export function* userSaga() {
    yield takeLatest(LOGIN_USER, loginUserSaga);
}

export default userSaga;
