export enum PageRoute {
  Home = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Movie = '/movie',
  Details = '/details',
  Reviews = '/reviews',
  AddReview = '/review',
  Player = '/player',
  NotFound = '/not-found',
}
export enum ApiRoute {
  Movies = '/films',
  Movie = '/film',
  Similar = '/similar',
  Featured = '/promo',
  MyList = '/favorite',
  Reviews = '/comments',
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

export enum StatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404
}
export const SIMILAR_SHOWN_QTY = 4;

export enum Namespace {
  Home = 'home',
  Active = 'active',
  User = 'user',
  Service = 'service',
}

export enum FormStatus {
  Available,
  Disabled,
  Submitted,
}
