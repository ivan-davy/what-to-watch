import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import User from '../../components/user/user';
import {AuthorizationStatus, PageRoute} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {useEffect} from 'react';
import {fetchHomeDataAction} from '../../store/api-actions';
import LoadingSpinner from '../../components/loading/loading-spinner';
import {getMyList} from '../../store/user/selectors';
import {getAuthStatus, getLoadingStatus} from '../../store/service/selectors';

export default function MyListScreen(): JSX.Element {
  const myListMovies = useAppSelector(getMyList);
  const authStatus = useAppSelector(getAuthStatus);
  const isLoading = useAppSelector(getLoadingStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction());
  }, []);

  if (authStatus !== AuthorizationStatus.Auth) {
    navigate(PageRoute.SignIn);
  }

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{myListMovies?.length}</span></h1>
        <User/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList movies={myListMovies}/>
      </section>
      <Footer/>
    </div>
  );
}
