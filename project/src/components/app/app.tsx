import HomeScreen from '../../pages/home-screen/home-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, PageRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PrivateRoute from '../private-route/private-route';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found/not-found-screen';
import {AppPropsType} from '../../types/types';


function App(appProps: AppPropsType): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PageRoute.Home}
          element={<HomeScreen {...appProps.home}/>}
        />
        <Route
          path={PageRoute.SignIn}
          element={<SignInScreen />}
        />
        <Route
          path={PageRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${PageRoute.Movie}/:id`}
          element={<MovieScreen />}
        />
        <Route
          path={`${PageRoute.Movie}/:id${PageRoute.AddReview}`}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${PageRoute.Player}/:id`}
          element={<PlayerScreen />}
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
