import { all } from 'redux-saga/effects';
import userSaga from "./userSagas";
import movieSaga from "./movieSagas";

export default function* rootSaga() {
  yield all([
    movieSaga(),
    userSaga(),
  ]);
}
