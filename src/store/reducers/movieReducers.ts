import { MovieState } from '../../types';
import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  UPLOAD_NEW_MOVIES,
  UPLOAD_NEW_MOVIES_SUCCESS, UPLOAD_NEW_MOVIES_FAILURE
} from '../actions/movieActions';

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

export const movieReducer = (state = initialState, action: any): MovieState => {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, loading: true };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.payload };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPLOAD_NEW_MOVIES:
      return { ...state, loading: true };
    case UPLOAD_NEW_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: [...state.movies, ...action.payload] };
    case UPLOAD_NEW_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
