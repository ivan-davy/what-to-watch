import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeMovie} from '../../mocks/mocks';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore();

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({active: {movie: makeFakeMovie()}})}>
        <HistoryRouter history={history}>
          <AddReviewForm/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
