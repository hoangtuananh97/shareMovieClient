// UploadMovieForm.test.tsx
import React from 'react';
import {render, screen, fireEvent, waitFor, within} from '@testing-library/react';
import UploadMovieForm from './UploadMovieForm';
import { uploadNewMovies } from '../../store/actions/movieActions';
import { useDispatch } from 'react-redux';
import {uploadNewImageApi} from "../../api/imageApi";
import {uploadNewVideoApi} from "../../api/videoApi";

jest.mock('../../api/videoApi', () => ({
    uploadNewVideoApi: jest.fn(),
}));
jest.mock('../../api/imageApi', () => ({
    uploadNewImageApi: jest.fn(),
}));
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('UploadMovieForm', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        jest.clearAllMocks();
    });

    it('renders form fields and allows user input', () => {
        render(<UploadMovieForm onClose={jest.fn()} />);

        // Find the movie element
        const movieElement = screen.getByTestId('upload-movie');
        const { getByLabelText } = within(movieElement);
        expect(getByLabelText(/Video URL:/i)).toBeInTheDocument();
        expect(getByLabelText(/Image URL:/i)).toBeInTheDocument();
        expect(getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(getByLabelText(/Description:/i)).toBeInTheDocument();
        expect(getByLabelText(/Tags:/i)).toBeInTheDocument();
    });

    it('shows validation errors if required fields are missing', async () => {
        render(<UploadMovieForm onClose={jest.fn()} />);

        // Try submitting the form without filling required fields
        fireEvent.submit(screen.getByRole('button', { name: /Share Movie/i }));

        // Check for validation error messages
        expect(screen.getByText(/Video is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Image is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });

    it('calls uploadNewImageApi and uploadNewVideoApi when files are selected', async () => {
        const mockImageResponse = { data: { url: 'mockImageURL' } };
        const mockVideoResponse = { data: { url: 'mockVideoURL' } };

        (uploadNewImageApi as jest.Mock).mockResolvedValue(mockImageResponse);
        (uploadNewVideoApi as jest.Mock).mockResolvedValue(mockVideoResponse);

        render(<UploadMovieForm onClose={jest.fn()} />);

        // Mock file input
        const videoFile = new File(['video'], 'video.mp4', { type: 'video/mp4' });
        const imageFile = new File(['image'], 'image.jpg', { type: 'image/jpeg' });

        // Trigger file input change
        fireEvent.change(screen.getByLabelText(/Video URL:/i), { target: { files: [videoFile] } });
        fireEvent.change(screen.getByLabelText(/Image URL:/i), { target: { files: [imageFile] } });

        // Wait for the API calls to resolve
        await waitFor(() => {
            expect(uploadNewVideoApi).toHaveBeenCalledWith(videoFile);
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(uploadNewImageApi).toHaveBeenCalledWith(imageFile);
        });

        // Check that the URLs are set in the formData
        expect(screen.queryByText('Failed to upload video')).not.toBeInTheDocument();
        expect(screen.queryByText('Failed to upload image')).not.toBeInTheDocument();
    });

    it('dispatches uploadNewMovies and calls onClose when form is valid and submitted', async () => {
        const mockOnClose = jest.fn();
        const mockImageResponse = { data: { url: 'mockImageURL' } };
        const mockVideoResponse = { data: { url: 'mockVideoURL' } };

        (uploadNewImageApi as jest.Mock).mockResolvedValue(mockImageResponse);
        (uploadNewVideoApi as jest.Mock).mockResolvedValue(mockVideoResponse);

        render(<UploadMovieForm onClose={mockOnClose} />);

        // Mock valid form inputs
        fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'Test Movie' } });
        fireEvent.change(screen.getByLabelText(/Video URL:/i), { target: { files: [new File(['video'], 'video.mp4')] } });
        fireEvent.change(screen.getByLabelText(/Image URL:/i), { target: { files: [new File(['image'], 'image.jpg')] } });

        // Submit the form
        fireEvent.submit(screen.getByRole('button', { name: /Share Movie/i }));

        await waitFor(() => {
            expect({
                type: 'UPLOAD_NEW_MOVIES',
                payload: {
                    video_url: 'mockVideoURL',
                    image_url: 'mockImageURL',
                    title: 'Test Movie',
                    description: null,
                    tags: null
                }
            }).toEqual(
                uploadNewMovies({
                    video_url: 'mockVideoURL',
                    image_url: 'mockImageURL',
                    title: 'Test Movie',
                    description: null,
                    tags: null,
                })
            );
        });
    });

    it('shows error message when video or image upload fails', async () => {
        const mockOnClose = jest.fn();

        (uploadNewVideoApi as jest.Mock).mockRejectedValue(new Error('Upload failed'));
        (uploadNewImageApi as jest.Mock).mockRejectedValue(new Error('Upload failed'));

        render(<UploadMovieForm onClose={mockOnClose} />);

        // Mock file input
        const videoFile = new File(['video'], 'video.mp4', { type: 'video/mp4' });
        const imageFile = new File(['image'], 'image.jpg', { type: 'image/jpeg' });

        // Trigger file input change
        fireEvent.change(screen.getByLabelText(/Video URL:/i), { target: { files: [videoFile] } });
        fireEvent.change(screen.getByLabelText(/Image URL:/i), { target: { files: [imageFile] } });

        await waitFor(() => {
            expect(screen.getByText('Failed to upload image')).toBeInTheDocument();
        });
    });
});
