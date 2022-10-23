import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {MovieType} from '../../types/types';
import MovieList from '../../components/movie-list/movie-list';

export type MyListScreenPropsType = {
  myListMovies: MovieType[];
}

export default function MyListScreen({myListMovies}: MyListScreenPropsType): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{myListMovies.length}</span></h1>
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

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <MovieList movies={myListMovies}/>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
