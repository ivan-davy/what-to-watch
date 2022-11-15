import {Namespace} from '../../const';
import {ActiveType, State} from '../../types/state';
import {MovieType, ReviewType} from '../../types/types';

export const getActiveData = (state: State): ActiveType => state[Namespace.Active];

export const getActiveMovie = (state: State): MovieType | null => state[Namespace.Active].movie;
export const getSimilarMovies = (state: State): MovieType[] | null => state[Namespace.Active].similar;
export const getReviews = (state: State): ReviewType[] => state[Namespace.Active].reviews;
