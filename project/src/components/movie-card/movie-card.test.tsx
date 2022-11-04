import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import {ALL_GENRES_FILTER_NAME} from '../../const';
import MovieCard from './movie-card';

const mockStore = configureMockStore();

describe('Component: MovieCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({home: {selectedGenre: ALL_GENRES_FILTER_NAME}})}>
        <HistoryRouter history={history}>
          <MovieCard movie={{...makeFakeMovie(), name: 'TEST'}} isActive={false}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
});
