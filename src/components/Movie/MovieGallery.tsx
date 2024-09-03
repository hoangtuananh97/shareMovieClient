import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../types';
import { fetchMovies } from '../../store/actions/movieActions';
import MovieItem from './MovieItem';

const MovieGallery: React.FC = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state: AppState) => state.movie);

  const loadMovies = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies.length === 0) {
      loadMovies();
    }
  }, [loadMovies, movies.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movies || movies.length === 0) return <div>No movies found</div>;

  return (
    <div className="movie-gallery">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default React.memo(MovieGallery);
