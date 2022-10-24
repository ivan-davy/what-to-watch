import {MovieType} from '../../types/types';
import {Link, useParams} from 'react-router-dom';
import {MovieScreenTab, PageRoute} from '../../const';
import MovieOverview from '../movie-overview/movie-overview';
import MovieDetails from '../movie-details/movie-details';
import MovieReviews from '../../movie-reviews/movie-reviews';
import {reviewsMock} from '../../mocks/reviews';

export type MovieTabsPropsData = {
  movies: MovieType[];
  tab: number;
}

const renderTab = (movie: MovieType, tab: number) => {
  switch (tab) {
    case MovieScreenTab.Overview:
      return <MovieOverview {...movie}/>;
    case MovieScreenTab.Details:
      return <MovieDetails {...movie}/>;
    case MovieScreenTab.Reviews:
      return <MovieReviews {...reviewsMock.slice(0, 3)}/>;
  }
};

export default function MovieTabs({movies, tab}: MovieTabsPropsData): JSX.Element {
  const params = useParams();
  const movie: MovieType | undefined = movies.find((item:MovieType) => item.id.toString() === params.id) as MovieType;
  return (
    <div className="film-card__info">
      <div className="film-card__poster film-card__poster--big">
        <img src={movie.posterImage} alt={`${movie.name} poster`} width="218"
          height="327"
        />
      </div>

      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className={`film-nav__item ${tab === 0 ? 'film-nav__item--active' : ''}`}>
              <Link to={`${PageRoute.Movie}/${movie.id}`} className="film-nav__link">Overview</Link>
            </li>
            <li className={`film-nav__item ${tab === 1 ? 'film-nav__item--active' : ''}`}>
              <Link to={`${PageRoute.Movie}/${movie.id}${PageRoute.Details}`} className="film-nav__link">Details</Link>
            </li>
            <li className={`film-nav__item ${tab === 2 ? 'film-nav__item--active' : ''}`}>
              <Link to={`${PageRoute.Movie}/${movie.id}${PageRoute.Reviews}`} className="film-nav__link">Reviews</Link>
            </li>
          </ul>
        </nav>

        {renderTab(movie, tab)}

      </div>
    </div>
  );
}
