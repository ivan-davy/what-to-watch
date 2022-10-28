import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import {MovieType} from '../../types/types';
import User from '../../components/user/user';

export default function MyListScreen(): JSX.Element {
  const myListMovies: MovieType[] = [];

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{myListMovies.length}</span></h1>
        <User/>
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
