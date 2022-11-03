import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ShowMore from './show-more';

const mockStore = configureMockStore();

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <ShowMore onClick={() => null}/>
        </HistoryRouter>
      </Provider>
    );

    const showMoreElement = screen.getByText('Show more');

    expect(showMoreElement).toBeInTheDocument();
  });
});
