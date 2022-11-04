import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import GenresList from './genres-list';
import {ALL_GENRES_FILTER_NAME} from '../../const';

const mockStore = configureMockStore();

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({home: {selectedGenre: ALL_GENRES_FILTER_NAME}})}>
        <HistoryRouter history={history}>
          <GenresList movies={[makeFakeMovie(), {...makeFakeMovie(), genre: 'TEST'}]}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('All Genres')).toBeInTheDocument();
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
});
