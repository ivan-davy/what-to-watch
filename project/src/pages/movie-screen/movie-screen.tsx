import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {useParams} from 'react-router-dom';
import {MovieType} from '../../types/types';
import NotFoundScreen from '../not-found/not-found-screen';
import {Link} from 'react-router-dom';
import {PageRoute} from '../../const';
import MovieList from '../../components/movie-list/movie-list';

export type MovieScreenPropType = {
  movies: MovieType[];
}

export default function MovieScreen({movies}: MovieScreenPropType): JSX.Element {
  const params = useParams();
  const movie = movies.find((item:MovieType) => item.id.toString() === params.id);
  if (movie === undefined) {
    return <NotFoundScreen />;
  }
  const prettyRating = (rating: number) => {
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
  const similarMovies = movies.slice(0, 4);

  return (
    <>
      <section className="film-card film-card--full" style={{background: movie.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <Link to='' className="user-block__link">Sign out</Link>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={`.${PageRoute.AddReview}`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movie.posterImage} alt={`${movie.name} poster`} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{movie.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{prettyRating(movie.rating)}</span>
                  <span className="film-rating__count">{movie.scoresCount} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{movie.description}</p>

                <p className="film-card__director"><strong>Director: {movie.director}</strong></p>

                <p className="film-card__starring"><strong>Starring: {movie.starring.join(', ')} and others</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList movies={similarMovies}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}
