import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import {AuthorizationStatus, PageRoute, StatusCode} from '../../const';
import MovieList from '../../components/movie-list/movie-list';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {fetchActiveMovieDataAction} from '../../store/api-actions';
import User from '../../components/user/user';
import {useEffect} from 'react';
import {resetErrorAction} from '../../store/action';

export default function MovieScreenLayout(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const movie = useAppSelector((state) => state.active.movie);
  const similar = useAppSelector((state) => state.active.similar);
  const myListMoviesQty: number | undefined = useAppSelector((state) => state.user?.myList.length);
  const authStatus = useAppSelector((state) => state.api.authStatus);
  const error = useAppSelector((state) => state.api.error);

  useEffect(() => {
    if (params.id !== movie.id.toString()) {
      dispatch(fetchActiveMovieDataAction(params.id as string));
    }
    if (error === StatusCode.NotFound) {
      navigate('/not-found');
    }
    dispatch(resetErrorAction());
  });


  return (
    <>
      <section className="film-card film-card--full" style={{background: `${movie.backgroundColor}80`}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <User/>
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
                {authStatus === AuthorizationStatus.Auth ?
                  <>
                    <button className="btn btn--list film-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                      <span className="film-card__count">{myListMoviesQty}</span>
                    </button>
                    <Link to={`.${PageRoute.AddReview}`} className="btn film-card__button">Add review</Link>
                  </> :
                  null}
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

          <MovieList movies={similar}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}
