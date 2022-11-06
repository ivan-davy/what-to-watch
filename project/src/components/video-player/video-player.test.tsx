import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {makeFakeMovie} from '../../mocks/mocks';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {PageRoute} from '../../const';
import VideoPlayer from './video-player';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore([thunk]);

describe('Component: VideoPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(`${PageRoute.Player}/${makeFakeMovie().id}`);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <VideoPlayer movie={makeFakeMovie()}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('A Star Is Born')).toBeInTheDocument();
  });
});
