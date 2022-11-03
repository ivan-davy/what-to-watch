import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import {PageRoute} from '../../const';
import MovieOverview from './movie-overview';

const mockStore = configureMockStore();

describe('Component: MovieOverview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(`${PageRoute.Movie}/${makeFakeMovie().id}`);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <MovieOverview {...makeFakeMovie()}/>
        </HistoryRouter>
      </Provider>
    );

    const ratingsElement = screen.getByText('244484 ratings');
    const directorElement = screen.getByText('Director: Bradley Cooper');
    const starringElement = screen.getByText('Starring: Lady Gaga, Bradley Cooper and others');

    expect(ratingsElement).toBeInTheDocument();
    expect(directorElement).toBeInTheDocument();
    expect(starringElement).toBeInTheDocument();
  });
});
