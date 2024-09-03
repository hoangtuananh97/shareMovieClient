import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../types';
import { fetchMovies } from '../../store/actions/movieActions';
import MovieItem from './MovieItem';

const MovieGallery: React.FC = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state: AppState) => state.movie);
  const initialFetchDone = useRef(false);

  const loadMovies = useCallback(() => {
    if (!loading && !initialFetchDone.current) {
      dispatch(fetchMovies());
      initialFetchDone.current = true;
    }
  }, [dispatch, loading]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

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