import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { requestMovieCredits } from '../../services/api';

const defaultImg =
  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieCast, setMovieCast] = useState(null);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsError(false);
        setIsLoading(true);
        if (movieId) {
          const data = await requestMovieCredits(movieId);
          setMovieCast(data.cast);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieCast !== null && movieCast.length ? (
        <ul className={css.castList}>
          {movieCast.map(cast => (
            <li className={css.castItem} key={cast.cast_id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : defaultImg
                }
                alt={cast.name}
                width="120"
              />
              <b className={css.castName}>{cast.name}</b>
              <p>Character: {cast.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any cast for this movie.</p>
      )}
    </>
  );
};

export default MovieCast;
