import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={css.movieList}>
        {Array.isArray(movies) &&
          movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link
                  className={css.moviesLink}
                  state={location}
                  to={`/movies/${movie.id}`}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MovieList;
