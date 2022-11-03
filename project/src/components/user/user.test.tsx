import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import User from './user';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();

describe('Component: User', () => {
  it('should render correctly if logged in', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({service: {authStatus: AuthorizationStatus.Auth}, user: {avatarUrl: '/'}})}>
        <HistoryRouter history={history}>
          <User/>
        </HistoryRouter>
      </Provider>
    );

    const signElement = screen.getByText('Sign Out');

    expect(signElement).toBeInTheDocument();
  });

  it('should render correctly if logged out', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({service: {authStatus: AuthorizationStatus.NoAuth}, user: {avatarUrl: '/'}})}>
        <HistoryRouter history={history}>
          <User/>
        </HistoryRouter>
      </Provider>
    );

    const signElement = screen.getByText('Sign In');

    expect(signElement).toBeInTheDocument();
  });
});
