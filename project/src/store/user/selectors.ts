import {UserType, State} from '../../types/state';
import {Namespace} from '../../const';
import {MovieType} from '../../types/types';

export const getUserData = (state: State): UserType => state[Namespace.User];

export const getId = (state: State): number | null => state[Namespace.User].id;
export const getName = (state: State): string | null => state[Namespace.User].name;
export const getEmail = (state: State): string | null => state[Namespace.User].email;
export const getToken = (state: State): string | null => state[Namespace.User].token;
export const getAvatarUrl = (state: State): string | null => state[Namespace.User].avatarUrl;
export const getMyList = (state: State): MovieType[] => state[Namespace.User].myList;


