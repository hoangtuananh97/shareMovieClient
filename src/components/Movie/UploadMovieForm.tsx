import React, {useState} from 'react';
import {UploadNewMovie} from "../../types";
import {uploadNewVideoApi} from "../../api/videoApi";
import {uploadNewImageApi} from "../../api/imageApi";
import {uploadNewMovies} from "../../store/actions/movieActions";
import {useDispatch} from "react-redux";

const UploadMovieForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [formData, setFormData] = useState<UploadNewMovie>({
        video_url: '',
        image_url: '',
        title: '',
        description: null,
        tags: null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({...errors, [name]: ''});
        }
    };

    const handleFileChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                const response = await uploadNewImageApi(file);
                setFormData({...formData, image_url: response.data.url});
            } catch (error) {
                console.error('Error uploading image', error);
                setErrors({...errors, image_url: 'Failed to upload image'});
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
                setErrors({...errors, video_url: 'Failed to upload video'});
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!formData.video_url) newErrors.video_url = 'Video is required';
        if (!formData.image_url) newErrors.image_url = 'Image is required';
        if (!formData.title.trim()) newErrors.title = 'Title is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            dispatch(uploadNewMovies(formData));
            onClose();
        }

    };

    return (
        <form onSubmit={handleSubmit} data-testid="upload-movie">
            <div>
                <label htmlFor="video-input">Video URL:</label>
                <input 
                    id="video-input"
                    type="file" 
                    name="video_url" 
                    onChange={handleFileChangeVideo} 
                    required
                />
                {errors.video_url && <span className="error">{errors.video_url}</span>}
            </div>
            <div>
                <label htmlFor="image-input">Image URL:</label>
                <input 
                    id="image-input"
                    type="file" 
                    name="image_url" 
                    onChange={handleFileChangeImage} 
                    required
                />
                {errors.image_url && <span className="error">{errors.image_url}</span>}
            </div>
            <div>
                <label htmlFor="title-input">Title:</label>
                <input 
                    id="title-input"
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required
                />
                {errors.title && <span className="error">{errors.title}</span>}
            </div>
            <div>
                <label htmlFor="description-input">Description:</label>
                <textarea 
                    id="description-input"
                    name="description" 
                    value={formData.description || ''} 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="tags-input">Tags:</label>
                <input 
                    id="tags-input"
                    type="text" 
                    name="tags" 
                    value={formData.tags || ''} 
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Share Movie</button>
        </form>
    );
};
export default UploadMovieForm;
