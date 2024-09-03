import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_NEW_VIDEO, uploadNewVideoFailure, uploadNewVideoSuccess } from '../actions/videoActions';
import { uploadNewVideoApi } from '../../api/videoApi';

function* uploadNewVideoSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(uploadNewVideoApi, action.payload);
        yield put(uploadNewVideoSuccess(response.data.url));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(uploadNewVideoFailure(error.message));
        } else {
            yield put(uploadNewVideoFailure('An unknown error occurred'));
        }
    }
}

function* videoSaga() {
    yield takeLatest(UPLOAD_NEW_VIDEO, uploadNewVideoSaga);
}

export default videoSaga;
