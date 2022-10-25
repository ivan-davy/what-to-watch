import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {MovieType} from '../../types/types';
import MovieList from '../../components/movie-list/movie-list';
import GenresList from '../../components/genres-list/genres-list';
import {useNavigate} from 'react-router-dom';
import {PageRoute} from '../../const';

export type HomeScreenPropsType = {
  featuredMovie: MovieType;
  movies: MovieType[];
  myListMoviesQty: number;
}

export default function HomeScreen({featuredMovie, movies, myListMoviesQty}: HomeScreenPropsType): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={featuredMovie.backgroundImage} alt={featuredMovie.name}/>
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
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={featuredMovie.posterImage} alt={`${featuredMovie.name} poster`} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{featuredMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{featuredMovie.genre}</span>
                <span className="film-card__year">{featuredMovie.released}</span>
              </p>

              <div className="film-card__buttons">
                <button onClick={() => navigate(`${PageRoute.Player}/${featuredMovie.id}`)} className="btn btn--play film-card__button" type="button">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content"
        style={{backgroundImage: `linear-gradient(-180deg, ${featuredMovie.backgroundColor} -500%, #000000 100%)`}}
      >
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <GenresList movies={movies}/>
          </ul>

          <MovieList movies={movies}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}
