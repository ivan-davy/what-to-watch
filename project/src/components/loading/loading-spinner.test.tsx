import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import LoadingSpinner from './loading-spinner';

const mockStore = configureMockStore();

describe('Component: LoadingSpinner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <LoadingSpinner/>
        </HistoryRouter>
      </Provider>
    );

    const spinnerElement = screen.getByTestId('oval-loading');

    expect(spinnerElement).toBeInTheDocument();
  });
});
