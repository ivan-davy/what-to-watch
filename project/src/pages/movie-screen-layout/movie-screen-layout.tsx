import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import {AuthorizationStatus, PageRoute} from '../../const';
import MovieList from '../../components/movie-list/movie-list';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {fetchActiveDataAction} from '../../store/api-actions';
import User from '../../components/user/user';
import {MovieType} from '../../types/types';
import { useEffect } from 'react';
import LoadingSpinner from '../../components/loading/loading-spinner';
import MyListButton from '../../components/my-list-button/my-list-button';

export default function MovieScreenLayout(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movie?.id.toString() !== params.id) {
      dispatch(fetchActiveDataAction(params.id as string));
    }
  }, []);

  const movie: MovieType | null = useAppSelector((state) => state.active.movie);
  const similar: MovieType[] = useAppSelector((state) => state.active.similar);
  const isLoading: boolean = useAppSelector((state) => state.service.isDataLoading);
  const authStatus: AuthorizationStatus = useAppSelector((state) => state.service.authStatus);

  if (isLoading || movie?.id.toString() !== params.id) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div>
      {
        movie && (
          <>
            <section className="film-card film-card--full" style={{background: `${movie?.backgroundColor}80`}}>
              <div className="film-card__hero">
                <div className="film-card__bg">
                  <img src={movie?.backgroundImage} alt={movie?.name}/>
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header film-card__head">
                  <Logo/>
                  <User/>
                </header>

                <div className="film-card__wrap">
                  <div className="film-card__desc">
                    <h2 className="film-card__title">{movie?.name}</h2>
                    <p className="film-card__meta">
                      <span className="film-card__genre">{movie?.genre}</span>
                      <span className="film-card__year">{movie?.released}</span>
                    </p>

                    <div className="film-card__buttons">
                      <button onClick={() => navigate(`${PageRoute.Player}/${movie?.id}`)} className="btn btn--play film-card__button" type="button">
                        <svg viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s"></use>
                        </svg>
                        <span>Play</span>
                      </button>
                      <MyListButton movie={movie}/>
                      {authStatus === AuthorizationStatus.Auth ?
                        <Link to={`${PageRoute.Movie}/${movie.id}${PageRoute.AddReview}`} className="btn film-card__button">Add review</Link> :
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
        )
      }
    </div>
  );
}
