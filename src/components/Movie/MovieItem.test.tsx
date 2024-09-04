import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieItem from './MovieItem';
import { Movie } from '../../types';

const mockMovie: Movie = {
  id: '1',
  video_url: 'http://example.com/video.mp4',
  image_url: 'http://example.com/image.jpg',
  title: 'Test Movie',
  shared_by: 'test@example.com',
  shared_at: '2023-05-01T12:00:00Z',
  likes: 10,
  dislikes: 2,
  description: 'This is a test movie',
  tags: 'test,movie',
};

describe('MovieItem component', () => {
  it('renders movie information correctly', () => {
    render(<MovieItem movie={mockMovie} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Shared by: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('10 👍')).toBeInTheDocument();
    expect(screen.getByText('2 👎')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie')).toBeInTheDocument();
  });

  it('renders video element with correct attributes', () => {
    render(<MovieItem movie={mockMovie} />);
  
    const videoElement = screen.getByTestId('movie-video');
    expect(videoElement).toHaveAttribute('poster', 'http://example.com/image.jpg');
    const sourceElement = videoElement.querySelector('source');
    expect(sourceElement).toHaveAttribute('src', 'http://example.com/video.mp4');
    expect(sourceElement).toHaveAttribute('type', 'video/mp4');
  });
});
