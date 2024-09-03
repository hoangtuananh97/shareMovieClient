import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {UPLOAD_NEW_IMAGE, uploadNewImageFailure, uploadNewImageSuccess} from "../actions/imageActions";
import {uploadNewImageApi} from "../../api/imageApi";

function* uploadNewImageSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(uploadNewImageApi, action.payload);
        yield put(uploadNewImageSuccess(response.data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            yield put(uploadNewImageFailure(error.message));
        } else {
            yield put(uploadNewImageFailure('An unknown error occurred'));
        }
    }
}

function* imageSaga() {
    yield takeLatest(UPLOAD_NEW_IMAGE, uploadNewImageSaga);
}

export default imageSaga;
