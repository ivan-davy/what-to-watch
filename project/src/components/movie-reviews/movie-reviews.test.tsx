import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import {PageRoute} from '../../const';
import MovieReviews from './movie-reviews';
import {makeFakeReviews} from '../../mocks/mocks';

const mockStore = configureMockStore();

describe('Component: MovieReviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(`${PageRoute.Movie}/${makeFakeMovie().id}`);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <MovieReviews {...makeFakeReviews()}/>
        </HistoryRouter>
      </Provider>
    );

    const reviewOne = screen.getByText('Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.');
    const reviewTwo = screen.getByText('The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics.');
    const reviewThree = screen.getByText('A movie that will take you to another world full of emotions.');

    expect(reviewOne).toBeInTheDocument();
    expect(reviewTwo).toBeInTheDocument();
    expect(reviewThree).toBeInTheDocument();
  });
});
