import { useEffect, useState, useRef, Suspense } from 'react';
import {
  Link,
  NavLink,
  useParams,
  useLocation,
  Outlet,
} from 'react-router-dom';

import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

import { requestMovieId } from '../../services/api.js';

const getLinkClassNames = ({ isActive }) =>
  clsx(css.addItems, {
    [css.active]: isActive,
  });

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function fetchMoviesId() {
      try {
        setIsError(false);
        setIsLoading(true);

        if (movieId) {
          const data = await requestMovieId(movieId);
          setMovieDetails(data);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoviesId();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div>
        <Link className={css.goBack} to={backLink.current}>
          ⬅ Go back
        </Link>
      </div>
      {movieDetails !== null && <MovieDetails movie={movieDetails} />}
      {!isError && !isLoading && (
        <>
          <div className={css.additionContainer}>
            <p>Addition information</p>
            <ul className={css.detailsList}>
              <li>
                <NavLink className={getLinkClassNames} to="cast">
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink className={getLinkClassNames} to="reviews">
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
