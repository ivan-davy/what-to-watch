import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MyListScreen from './my-list-screen';
import {AuthorizationStatus} from '../../const';
import {ALL_GENRES_FILTER_NAME} from '../../const';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

describe('Component: MyListScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        home: {
          selectedGenre: ALL_GENRES_FILTER_NAME,
        },
        service: {
          authStatus: AuthorizationStatus.Auth
        },
        user: {
          avatarUrl: '/',
          myList: []
        }
      })}
      >
        <HistoryRouter history={history}>
          <MyListScreen/>
        </HistoryRouter>
      </Provider>
    );

    const myListElement = screen.getByText('My list');

    expect(myListElement).toBeInTheDocument();
  });
});
