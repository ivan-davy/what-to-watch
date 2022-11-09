import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import SignInScreen from './sign-in-screen';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();

describe('Component: SignInScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({service: {authStatus: AuthorizationStatus.NoAuth}})}>
        <HistoryRouter history={history}>
          <SignInScreen/>
        </HistoryRouter>
      </Provider>
    );

    const emailElement = screen.getByText('Email address');
    const passwordElement = screen.getByText('Password');

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
  });
});
