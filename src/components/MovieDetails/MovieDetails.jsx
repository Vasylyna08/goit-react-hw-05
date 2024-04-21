import css from './MovieDetails.module.css';

const defaultImg =
  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

const MovieDetails = ({ movie }) => {
  const vote = Math.floor(movie.vote_average * 10);
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '';
  return (
    <div className={css.card}>
      <div className={css.imgWrapper}>
        <img
          className={css.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          width={250}
        />
      </div>
      <div>
        <h2>
          {movie.title} ({year})
        </h2>
        <p className={css.score}>User Score: {vote}%</p>
        <h3>Overview</h3>
        <p className={css.overview}>{movie.overview}</p>
        <h3>Genres</h3>
        <ul className={css.genres}>
          {movie.genres.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
