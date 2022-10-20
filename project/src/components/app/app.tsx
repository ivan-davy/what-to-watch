import HomeScreen from '../../pages/home-screen/home-screen';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {PageRoute} from '../../const';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found/not-found-screen';

type FeaturedMoviePropType = {
  title: string;
  genre: string;
  releaseYear: number;
}

type AppPropType = {
  featuredMovie: FeaturedMoviePropType;
}

function App(appProp: AppPropType): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PageRoute.Home}
          element={<HomeScreen {...appProp.featuredMovie}/>}
        />
        <Route
          path={PageRoute.SignIn}
          element={<SignInScreen />}
        />
        <Route
          path={PageRoute.MyList}
          element={<MyListScreen />}
        />
        <Route
          path={`${PageRoute.Movie}/:id`}
          element={<MovieScreen />}
        />
        <Route
          path={`${PageRoute.Movie}/:id${PageRoute.AddReview}`}
          element={<AddReviewScreen />}
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
