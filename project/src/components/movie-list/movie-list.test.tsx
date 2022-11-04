import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MovieList from './movie-list';
import {makeFakeMovie} from '../../mocks/mocks';
import {ALL_GENRES_FILTER_NAME} from '../../const';

const mockStore = configureMockStore();

describe('Component: MovieList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({home: {selectedGenre: ALL_GENRES_FILTER_NAME}})}>
        <HistoryRouter history={history}>
          <MovieList movies={[makeFakeMovie(), {...makeFakeMovie(), name: 'TEST', id: 2}]}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(makeFakeMovie().name)).toBeInTheDocument();
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
});
