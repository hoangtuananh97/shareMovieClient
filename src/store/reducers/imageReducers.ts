import {ImageState} from '../../types';
import {UPLOAD_NEW_VIDEO, UPLOAD_NEW_VIDEO_FAILURE, UPLOAD_NEW_VIDEO_SUCCESS} from '../actions/videoActions';

const initialState: ImageState = {
    image: null,
    loading: false,
    error: null,
};


export const imageReducer = (state = initialState, action: any): ImageState => {
    switch (action.type) {
        case UPLOAD_NEW_VIDEO:
            return {...state, loading: true};
        case UPLOAD_NEW_VIDEO_SUCCESS:
            return {...state, loading: false, image: action.payload};
        case UPLOAD_NEW_VIDEO_FAILURE:
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};
