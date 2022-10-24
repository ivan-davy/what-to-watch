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
