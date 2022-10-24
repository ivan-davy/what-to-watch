import HomeScreen from '../../pages/home-screen/home-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, PageRoute, MovieScreenTab} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PrivateRoute from '../private-route/private-route';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found/not-found-screen';
import MovieScreenLayout from '../../pages/movie-screen-layout/movie-screen-layout';
import {MovieType, ReviewType} from '../../types/types';
import MovieTabs from '../movie-tabs/movie-tabs';

export type AppPropsType = {
  featuredMovie: MovieType;
  movies: MovieType[];
  reviews: ReviewType[];
  myListMovies: MovieType[];
}

function App({featuredMovie, movies, reviews, myListMovies}: AppPropsType): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PageRoute.Home}
          element={
            <HomeScreen
              featuredMovie={featuredMovie}
              movies={movies}
              myListMoviesQty={myListMovies.length}
            />
          }
        />
        <Route
          path={PageRoute.SignIn}
          element={<SignInScreen />}
        />
        <Route
          path={PageRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListScreen myListMovies={myListMovies}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${PageRoute.Movie}/:id`}
          element={<MovieScreenLayout movies={movies} myListMoviesQty={myListMovies.length}/>}
        >
          <Route path={''} element={<MovieTabs movies={movies} tab={MovieScreenTab.Overview}/>}/>
          <Route path={`${PageRoute.Movie}/:id${PageRoute.Details}`} element={<MovieTabs movies={movies} tab={MovieScreenTab.Details}/>}/>
          <Route path={`${PageRoute.Movie}/:id${PageRoute.Reviews}`} element={<MovieTabs movies={movies} tab={MovieScreenTab.Reviews}/>}/>
        </Route>
        <Route
          path={`${PageRoute.Movie}/:id${PageRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <AddReviewScreen movies={movies}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${PageRoute.Player}/:id`}
          element={<PlayerScreen movies={movies}/>}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
