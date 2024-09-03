import { combineReducers } from 'redux';
import {movieReducer} from "./movieReducers";
import authReducer from "./authReducer";
import {userReducer} from "./userReducers";

const rootReducer = combineReducers({
  movie: movieReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
