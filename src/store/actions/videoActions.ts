export const UPLOAD_NEW_VIDEO = 'UPLOAD_NEW_VIDEO';
export const UPLOAD_NEW_VIDEO_SUCCESS = 'UPLOAD_NEW_VIDEO_SUCCESS';
export const UPLOAD_NEW_VIDEO_FAILURE = 'UPLOAD_NEW_VIDEO_FAILURE';

export const uploadNewVideo = (file: File) => ({
    type: UPLOAD_NEW_VIDEO,
    payload: file,
});

export const uploadNewVideoSuccess = (url: string) => ({
    type: UPLOAD_NEW_VIDEO_SUCCESS,
    payload: url,
});

export const uploadNewVideoFailure = (error: string) => ({
    type: UPLOAD_NEW_VIDEO_FAILURE,
    payload: error,
});

