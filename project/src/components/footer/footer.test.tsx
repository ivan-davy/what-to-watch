import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Footer from './footer';

const mockStore = configureMockStore();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Footer/>
        </HistoryRouter>
      </Provider>
    );

    const wtwElement = screen.getByText('© 2022 What to watch Ltd.');

    expect(wtwElement).toBeInTheDocument();
  });
});
