export const makeFakeMovie = () => ({
  'name': 'A Star Is Born',
  'posterImage': 'https://11.react.pages.academy/static/film/poster/A_Star_Is_Born.jpg',
  'previewImage': 'https://11.react.pages.academy/static/film/preview/A_Star_Is_Born.jpg',
  'backgroundImage': 'https://11.react.pages.academy/static/film/background/A_Star_is_Born.jpg',
  'backgroundColor': '#C4C0C0',
  'description': 'A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.',
  'rating': 3.9,
  'scoresCount': 244484,
  'director': 'Bradley Cooper',
  'starring': [
    'Lady Gaga',
    'Bradley Cooper',
    'Sam Elliott'
  ],
  'runTime': 136,
  'genre': 'Drama',
  'released': 2018,
  'id': 1,
  'isFavorite': false,
  'videoLink': 'https://11.react.pages.academy/static/film/video/bubbles.mp4',
  'previewVideoLink': 'https://11.react.pages.academy/static/film/video/traffic.mp4'
});

export const makeFakeReviews = () => ([
  {
    'id': 1,
    'user': {
      'id': 16,
      'name': 'Mollie'
    },
    'rating': 3.8,
    'comment': 'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    'date': '2022-10-04T13:58:46.523Z'
  },
  {
    'id': 2,
    'user': {
      'id': 16,
      'name': 'Mollie'
    },
    'rating': 4.4,
    'comment': 'The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. ',
    'date': '2022-09-28T13:58:46.523Z'
  },
  {
    'id': 3,
    'user': {
      'id': 16,
      'name': 'Mollie'
    },
    'rating': 2.4,
    'comment': 'A movie that will take you to another world full of emotions.',
    'date': '2022-09-27T13:58:46.523Z'
  }
]);

export const makeFakeActiveData = () => ({
  movie: makeFakeMovie(),
  similar: [makeFakeMovie(),
    {...makeFakeMovie(), id: 2},
    {...makeFakeMovie(), id: 3},
    {...makeFakeMovie(), id: 4},
  ],
  reviews: makeFakeReviews(),
});

export const makeFakeHomeData = () => ({
  featuredMovie: makeFakeMovie(),
  movies: [makeFakeMovie(),
    {...makeFakeMovie(), id: 2},
    {...makeFakeMovie(), id: 3},
    {...makeFakeMovie(), id: 4},
    {...makeFakeMovie(), id: 5},
    {...makeFakeMovie(), id: 6}]
});

export const makeFakeUserData = () => ({
  avatarUrl: 'avt',
  email: 'email',
  id: 24,
  name: 'name',
  token: 'token',
  myList: [],
});

export const makeFakeUserReview = () => ({
  comment: 'comment',
  rating: 0,
});

export const makeAuthDataType = () => ({
  login: 'login',
  password: 'password',
});


