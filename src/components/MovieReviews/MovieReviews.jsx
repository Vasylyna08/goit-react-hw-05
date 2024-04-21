import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { requestMovieReviews } from '../../services/api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setIsLoading(true);
        setIsError(false);

        if (movieId) {
          const data = await requestMovieReviews(movieId);
          setMovieReviews(data.results);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movieReviews !== null &&
        (movieReviews.length ? (
          <ul className={css.reviewsList}>
            {movieReviews.map(movieReview => (
              <li className={css.reviewsItem} key={movieReview.id}>
                <h3 className={css.reviewsTitle}>
                  Author: {movieReview.author}
                </h3>
                <p>{movieReview.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews for this movie.</p>
        ))}
    </>
  );
};

export default MovieReviews;
