import {fetchHomeDataAction, postToggleMyListMovie} from '../api-actions';
import {makeFakeHomeData, makeFakeMovie} from '../../mocks/mocks';
import {home, initialState} from './home';

describe('Reducer: home', () => {
  it('without additional parameters should return initial state', () => {
    expect(home.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update the state after a successful fetch without changing the selected genre', () => {
    expect(home.reducer(initialState, {type: fetchHomeDataAction.fulfilled.type, payload: makeFakeHomeData()}))
      .toEqual({...makeFakeHomeData(), selectedGenre: initialState.selectedGenre});
  });

  it('should update featuredMovie\'s isFavorite value only in case it was the one added/removed from myList', () => {
    expect(home.reducer(initialState, {type: postToggleMyListMovie.fulfilled.type, payload: makeFakeMovie()}))
      .toEqual(initialState);
  });
});
