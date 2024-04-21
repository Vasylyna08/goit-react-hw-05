import { useEffect, useState } from 'react';
import css from './HomePage.module.css';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { requestTrending } from '..//../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await requestTrending();

        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movies to display!</p>
      )}
    </div>
  );
};

export default HomePage;
