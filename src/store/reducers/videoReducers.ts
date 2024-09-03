import {VideoState} from '../../types';
import {
    UPLOAD_NEW_VIDEO,
    UPLOAD_NEW_VIDEO_SUCCESS,
    UPLOAD_NEW_VIDEO_FAILURE
} from '../actions/videoActions';

const initialState: VideoState = {
    videoUrl: "",
    loading: false,
    error: null,
};


export const videoReducer = (state = initialState, action: any): VideoState => {
    switch (action.type) {
        case UPLOAD_NEW_VIDEO:
            return {...state, loading: true};
        case UPLOAD_NEW_VIDEO_SUCCESS:
            return {...state, loading: false, videoUrl: action.payload};
        case UPLOAD_NEW_VIDEO_FAILURE:
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};
