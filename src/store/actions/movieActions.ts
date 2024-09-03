import {Movie, UploadNewMovie} from '../../types';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMovies = () => ({type: FETCH_MOVIES});
export const fetchMoviesSuccess = (movies: Movie[]) => ({type: FETCH_MOVIES_SUCCESS, payload: movies});
export const fetchMoviesFailure = (error: string) => ({type: FETCH_MOVIES_FAILURE, payload: error});

export const UPLOAD_NEW_MOVIES = 'UPLOAD_NEW_MOVIES';
export const UPLOAD_NEW_MOVIES_SUCCESS = 'UPLOAD_NEW_MOVIES_SUCCESS';
export const UPLOAD_NEW_MOVIES_FAILURE = 'UPLOAD_NEW_MOVIES_FAILURE';

export const uploadNewMovies = (movies: UploadNewMovie) => ({
    type: UPLOAD_NEW_MOVIES, payload: movies
});
export const uploadNewMoviesSuccess = (movies: UploadNewMovie) => ({
    type: UPLOAD_NEW_MOVIES_SUCCESS,
    payload: movies
});
export const uploadNewMoviesFailure = (error: string) => ({type: UPLOAD_NEW_MOVIES_FAILURE, payload: error});


export const NEW_VIDEO_NOTIFICATION = 'NEW_VIDEO_NOTIFICATION';
export const newVideoNotification = (videoData: any) => ({
    type: NEW_VIDEO_NOTIFICATION,
    payload: videoData,
});
