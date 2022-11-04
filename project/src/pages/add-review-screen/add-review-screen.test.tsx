import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import thunk from 'redux-thunk';
import {makeFakeActiveData} from '../../mocks/mocks';
import AddReviewScreen from './add-review-screen';

const mockStore = configureMockStore([thunk]);

describe('Component: AddReviewScreen', () => {
  it('should update active data correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        active: makeFakeActiveData(),
        service: {
          authStatus: AuthorizationStatus.Auth,
          isDataLoading: false
        },
        user: {
          avatarUrl: '/',
          myList: []
        }
      })}
      >
        <HistoryRouter history={history}>
          <AddReviewScreen/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('oval-loading')).toBeInTheDocument();
  });
});
