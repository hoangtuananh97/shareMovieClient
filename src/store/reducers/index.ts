import { combineReducers } from 'redux';
import {movieReducer} from "./movieReducers";
import {userReducer} from "./userReducers";
import authReducer from "./authReducer";
import {videoReducer} from "./videoReducers";
import {imageReducer} from "./imageReducers";

const rootReducer = combineReducers({
  movie: movieReducer,
  user: userReducer,
  auth: authReducer,
  video: videoReducer,
  image: imageReducer,
});

export default rootReducer;
