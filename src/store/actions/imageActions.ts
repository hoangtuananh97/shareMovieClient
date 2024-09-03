import {UploadNewImage} from '../../types';


export const UPLOAD_NEW_IMAGE = 'UPLOAD_NEW_IMAGE';
export const UPLOAD_NEW_IMAGE_SUCCESS = 'UPLOAD_NEW_IMAGE_SUCCESS';
export const UPLOAD_NEW_IMAGE_FAILURE = 'UPLOAD_NEW_IMAGE_FAILURE';

export const uploadNewImage = (image: UploadNewImage) => ({type: UPLOAD_NEW_IMAGE, payload: image});
export const uploadNewImageSuccess = (image: UploadNewImage) => ({type: UPLOAD_NEW_IMAGE_SUCCESS, payload: image});
export const uploadNewImageFailure = (error: string) => ({type: UPLOAD_NEW_IMAGE_FAILURE, payload: error});
