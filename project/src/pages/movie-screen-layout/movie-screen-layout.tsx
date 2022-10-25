import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {MovieType} from '../../types/types';
import NotFoundScreen from '../not-found/not-found-screen';
import {Link} from 'react-router-dom';
import {PageRoute} from '../../const';
import MovieList from '../../components/movie-list/movie-list';

export type MovieScreenPropType = {
  movies: MovieType[];
  myListMoviesQty: number;
}

export default function MovieScreenLayout({movies, myListMoviesQty}: MovieScreenPropType): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const movie = movies.find((item:MovieType) => item.id.toString() === params.id);
  if (movie === undefined) {
    return <NotFoundScreen />;
  }
  const similarMovies = movies.slice(0, 4);

  return (
    <>
      <section className="film-card film-card--full" style={{background: `${movie.backgroundColor}80`}}>
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
                <button onClick={() => navigate(`${PageRoute.Player}/${movie.id}`)} className="btn btn--play film-card__button" type="button">
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
                  <span className="film-card__count">{myListMoviesQty}</span>
                </button>
                <Link to={`.${PageRoute.AddReview}`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <Outlet/>
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
