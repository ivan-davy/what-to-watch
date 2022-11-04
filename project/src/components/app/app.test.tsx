import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, PageRoute} from '../../const';
import {makeFakeActiveData, makeFakeHomeData, makeFakeUserData} from '../../mocks/mocks';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {render, screen} from '@testing-library/react';

const mockStore = configureMockStore();

const store = mockStore({
  home: makeFakeHomeData(),
  active: makeFakeActiveData(),
  user: makeFakeUserData(),
  service: {isDataLoading: false, authStatus: AuthorizationStatus.Auth}
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render home screen when user navigates to "/"', () => {
    history.push(PageRoute.Home);

    render(fakeApp);

    expect(screen.getByText(/A Star is Born/i)).toBeInTheDocument();
  });
});
