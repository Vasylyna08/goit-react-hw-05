import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { noquery, notify } from '../../services/toaster';

import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';

import { requestSearch } from '../../services/api';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    async function fetchSearchMovies() {
      if (searchQuery === null) return;

      try {
        setIsLoading(true);
        setIsError(false);
        const data = await requestSearch(searchQuery);

        if (data.results.length === 0) {
          noquery();
          return;
        }
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSearchMovies();
  }, [searchQuery]);

  const onSetSearchQuery = searchQuery => {
    if (searchQuery.trim().length === 0) {
      notify();
      return;
    }
    setSearchParams({ query: searchQuery });
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSetSearchQuery={onSetSearchQuery}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isError && !isLoading && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
      <Toaster
        toastOptions={{
          style: {
            background: '#ff0342',
            color: '#000',
          },
        }}
      />
    </div>
  );
};

export default MoviesPage;
