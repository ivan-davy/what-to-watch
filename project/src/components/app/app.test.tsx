import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, PageRoute} from '../../const';
import {makeFakeActiveData, makeFakeHomeData, makeFakeMovie, makeFakeUserData} from '../../mocks/mocks';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

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
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render movie screen when user navigates to "/movies/:id"', () => {
    history.push(`${PageRoute.Movie}/${makeFakeMovie().id}`);

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/2018/i)).toBeInTheDocument();
  });

  it('should render add review screen when user navigates to /movies/:id and logged in', () => {
    history.push(`${PageRoute.Movie}/${makeFakeMovie().id}${PageRoute.AddReview}`);

    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render player screen when user navigates to /player/:id', () => {
    history.push(`${PageRoute.Player}/${makeFakeMovie().id}`);

    render(fakeApp);

    expect(screen.getByText(/A Star Is Born/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });
});
