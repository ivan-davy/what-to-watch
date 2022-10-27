export enum PageRoute {
  Home = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Movie = '/movie',
  Details = '/details',
  Reviews = '/reviews',
  AddReview = '/review',
  Player = '/player'
}
export enum ApiRoute {
  Movies = '/films',
  Movie = '/film',
  Similar = '/similar',
  Featured = '/promo',
  MyList = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MovieScreenTab {
  Overview,
  Details,
  Reviews
}

export const ALL_GENRES_FILTER_NAME = 'All Genres';

export const MAX_MOVIES_SHOWN_HOME = 8;
