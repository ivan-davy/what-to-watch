import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import thunk from 'redux-thunk';
import HomeScreen from './home-screen';
import {makeFakeHomeData} from '../../mocks/mocks';

const mockStore = configureMockStore([thunk]);

describe('Component: HomeScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        home: makeFakeHomeData(),
        service: {
          authStatus: AuthorizationStatus.Auth,
          isDataLoading: true
        },
        user: {
          avatarUrl: '/',
          myList: []
        }
      })}
      >
        <HistoryRouter history={history}>
          <HomeScreen/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('WTW')).toBeInTheDocument();
  });
});
