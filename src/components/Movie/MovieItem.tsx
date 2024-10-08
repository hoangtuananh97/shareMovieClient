import React from 'react';
import {Movie} from '../../types';

interface MovieItemProps {
    movie: Movie;
}

function getVideoFileExtension(url: string): string {
    const extension = url.split('.').pop()?.split(/\#|\?/)[0] ?? '';
    return 'video/' + extension;
}

const MovieItem: React.FC<MovieItemProps> = React.memo(({movie}) => {
    return (
        <div className="movie-item">
            <div className="movie-video">
                <video controls width="100%" height="100%" poster={movie.image_url} data-testid="movie-video">
                    <source src={movie.video_url} type={getVideoFileExtension(movie.video_url)}/>
                </video>
            </div>
            <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>Shared by: {movie.shared_by}</p>
                <p>
                    <span role="img" aria-label="likes">{movie.likes} 👍</span>
                    <span role="img" aria-label="dislikes">{movie.dislikes} 👎</span>
                </p>
                <p>Description:</p>
                <p>{movie.description}</p>
            </div>
        </div>
    );
});

export default MovieItem;
