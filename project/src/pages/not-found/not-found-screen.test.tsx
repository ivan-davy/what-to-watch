import NotFoundScreen from './not-found-screen';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {render, screen} from '@testing-library/react';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundScreen/>
      </HistoryRouter>,
    );

    const codeElement = screen.getByText('404');
    const linkElement = screen.getByText('Return to home page');

    expect(codeElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
