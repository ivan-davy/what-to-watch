import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import thunk from 'redux-thunk';
import MovieScreenLayout from './movie-screen-layout';
import {makeFakeMovie} from '../../mocks/mocks';

const mockStore = configureMockStore([thunk]);

describe('Component: MovieScreenLayout', () => {
  it('should update active movie correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        active: {
          movie: makeFakeMovie(),
        },
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
          <MovieScreenLayout/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('oval-loading')).toBeInTheDocument();
  });
});
