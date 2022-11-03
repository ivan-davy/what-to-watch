import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import {PageRoute} from '../../const';
import MovieDetails from './movie-details';

const mockStore = configureMockStore();

describe('Component: MovieDetails', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(`${PageRoute.Movie}/${makeFakeMovie().id}`);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <MovieDetails {...makeFakeMovie()}/>
        </HistoryRouter>
      </Provider>
    );

    const directorElement = screen.getByText('Director');
    const starringElement = screen.getByText('Starring');
    const runtimeElement = screen.getByText('Run Time');
    const genreElement = screen.getByText('Genre');
    const releasedElement = screen.getByText('Released');

    expect(directorElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
    expect(runtimeElement).toBeInTheDocument();
    expect(genreElement).toBeInTheDocument();
    expect(releasedElement).toBeInTheDocument();
  });
});
