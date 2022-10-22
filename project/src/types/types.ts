export type FeaturedMoviePropsType = {
  title: string;
  genre: string;
  releaseYear: number;
}

export type HomePropsType = {
  featuredMovie: FeaturedMoviePropsType;
}

export type AppPropsType = {
  home: HomePropsType;
}

export type Movie = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type Movies = Movie[]

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type Reviews = Review[]
