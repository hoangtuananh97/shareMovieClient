import { combineReducers } from 'redux';
import {movieReducer} from "./movieReducers";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  movie: movieReducer,
  auth: authReducer,
});

export default rootReducer;
