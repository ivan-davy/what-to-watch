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
import MovieTabs from '../movie-tabs/movie-tabs';
import {useAppSelector} from '../../hooks/store-hooks';
import LoadingSpinner from '../loading/loading-spinner';


function App(): JSX.Element {
  const movies = useAppSelector((state) => state.home.movies);
  const authStatus = useAppSelector((state) => state.api.authStatus);
  const isDataLoading = useAppSelector((state) => state.api.isDataLoading);

  if (authStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PageRoute.Home}
          element={
            <HomeScreen/>
          }
        />
        <Route
          path={PageRoute.SignIn}
          element={<SignInScreen/>}
        />
        <Route
          path={PageRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authStatus}>
              <MyListScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${PageRoute.Movie}/:id`}
          element={<MovieScreenLayout/>}
        >
          <Route path={''} element={<MovieTabs tab={MovieScreenTab.Overview}/>}/>
          <Route path={`${PageRoute.Movie}/:id${PageRoute.Details}`} element={<MovieTabs tab={MovieScreenTab.Details}/>}/>
          <Route path={`${PageRoute.Movie}/:id${PageRoute.Reviews}`} element={<MovieTabs tab={MovieScreenTab.Reviews}/>}/>
        </Route>
        <Route
          path={`${PageRoute.Movie}/:id${PageRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={authStatus}>
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
