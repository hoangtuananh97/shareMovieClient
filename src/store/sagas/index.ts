import { all } from 'redux-saga/effects';
import videoSaga from './movieSagas';
import userSaga from "./userSagas";
import movieSaga from "./movieSagas";
import imageSaga from "./imageSagas";

export default function* rootSaga() {
  yield all([
    movieSaga(),
    userSaga(),
    videoSaga(),
    imageSaga(),
  ]);
}
