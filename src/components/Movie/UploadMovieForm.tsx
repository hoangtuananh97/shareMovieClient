import React, {useState} from 'react';
import {UploadNewMovie} from "../../types";
import {uploadNewVideoApi} from "../../api/videoApi";
import {uploadNewImageApi} from "../../api/imageApi";
import {uploadNewMovies} from "../../store/actions/movieActions";
import {useDispatch} from "react-redux";

const UploadMovieForm: React.FC = () => {
    const [formData, setFormData] = useState<UploadNewMovie>({
        video_url: '',
        image_url: '',
        title: '',
        description: null,
        tags: null,
    });
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                const response = await uploadNewImageApi(file);
                setFormData({...formData, image_url: response.data.url});
            } catch (error) {
                console.error('Error uploading video', error);
            }

        }
    };

    const handleFileChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                const response = await uploadNewVideoApi(file);
                setFormData({...formData, video_url: response.data.url});
            } catch (error) {
                console.error('Error uploading video', error);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(uploadNewMovies(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Video URL:</label>
                <input type="file" name="video_url" onChange={handleFileChangeVideo} required/>
            </div>
            <div>
                <label>Image URL:</label>
                <input type="file" name="image_url" onChange={handleFileChangeImage} required/>
            </div>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description || ''} onChange={handleChange}/>
            </div>
            <div>
                <label>Tags:</label>
                <input type="text" name="tags" value={formData.tags || ''} onChange={handleChange}/>
            </div>
            <button type="submit">Upload Movie</button>
        </form>
    );
};

export default UploadMovieForm;
