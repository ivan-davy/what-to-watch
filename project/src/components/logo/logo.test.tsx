import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Logo from './logo';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: Logo', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {


    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Logo/>
        </HistoryRouter>
      </Provider>
    );

    const wElements = screen.getAllByText('W');
    const tElement = screen.getByText('T');

    expect(wElements[0]).toBeInTheDocument();
    expect(tElement).toBeInTheDocument();
    expect(wElements[1]).toBeInTheDocument();
  });

  it('should redirect to home when clicked', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>MAIN PAGE</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/MAIN PAGE/i)).toBeInTheDocument();
  });
});
