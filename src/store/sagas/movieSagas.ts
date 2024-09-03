import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_MOVIES,
    fetchMoviesSuccess,
    fetchMoviesFailure,
    uploadNewMoviesSuccess,
    uploadNewMoviesFailure, UPLOAD_NEW_MOVIES
} from '../actions/movieActions';
import {Movie} from '../../types';
import {fetchMoviesApi, uploadNewMoviesApi} from '../../api/movieApi';

function* fetchMoviesSaga(): Generator<any, void, any> {
    try {
        console.log("fetchMoviesSaga");
        const response: { data: { Status: string, Videos: Movie[] } } = yield call(fetchMoviesApi);
        yield put(fetchMoviesSuccess(response.data.Videos));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            yield put(fetchMoviesFailure(error.message));
        } else {
            console.error("Unknown error:", error);
            yield put(fetchMoviesFailure('An unknown error occurred'));
        }
    }
}

function* uploadNewMoviesSaga(action: any): Generator<any, void, any> {
    try {
        console.log("uploadNewMoviesSaga");
        const response = yield call(uploadNewMoviesApi, action.payload);
        yield put(uploadNewMoviesSuccess(response.data));

        yield put({type: FETCH_MOVIES});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            yield put(uploadNewMoviesFailure(error.message));
        } else {
            console.error("Unknown error:", error);
            yield put(uploadNewMoviesFailure('An unknown error occurred'));
        }
    }
}

function* movieSaga() {
    yield takeLatest(FETCH_MOVIES, fetchMoviesSaga);
    yield takeEvery(UPLOAD_NEW_MOVIES, uploadNewMoviesSaga);
}

export default movieSaga;
