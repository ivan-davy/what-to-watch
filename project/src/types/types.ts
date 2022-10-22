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
