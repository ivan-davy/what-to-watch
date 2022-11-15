import {MovieType} from '../../types/types';

export default function MovieOverview({...movie}: MovieType): JSX.Element {
  const getPrettyRating = (rating: number) => {
    if (rating >= 0 && rating < 3) {
      return 'Bad';
    }
    if (rating >= 3 && rating < 5) {
      return 'Mediocre';
    }
    if (rating >= 5 && rating < 8) {
      return 'Good';
    }
    if (rating >= 8 && rating < 10) {
      return 'Very good';
    }
    if (rating === 10) {
      return 'Awesome';
    }
    return 'NaN';
  };
  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{movie.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getPrettyRating(movie.rating)}</span>
          <span className="film-rating__count">{movie.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{movie.description}</p>
        <p className="film-card__director"><strong>Director: {movie.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {movie.starring.slice(0, 2).join(', ')} and others</strong>
        </p>
      </div>
    </>
  );
}
