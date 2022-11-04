import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import MovieTabs from './movie-tabs';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import {MovieScreenTab, PageRoute} from '../../const';

const mockStore = configureMockStore();

describe('Component: MovieTabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(`${PageRoute.Movie}/${makeFakeMovie().id}`);

    render(
      <Provider store={mockStore({active: {movie: makeFakeMovie(), reviews: []}})}>
        <HistoryRouter history={history}>
          <MovieTabs tab={MovieScreenTab.Overview} />
        </HistoryRouter>
      </Provider>
    );

    const overviewElement = screen.getByText('Overview');
    const detailsElement = screen.getByText('Details');
    const ReviewsElement = screen.getByText('Reviews');

    expect(overviewElement).toBeInTheDocument();
    expect(detailsElement).toBeInTheDocument();
    expect(ReviewsElement).toBeInTheDocument();
  });
});
