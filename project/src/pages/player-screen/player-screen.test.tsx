import {render, screen} from '@testing-library/react';
import PlayerScreen from '../../pages/player-screen/player-screen';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {makeFakeMovie} from '../../mocks/mocks';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {PageRoute} from '../../const';

const mockStore = configureMockStore([thunk]);

describe('Component: PlayerScreen', () => {
  it('should update active movie correctly', () => {
    const history = createMemoryHistory();
    history.push(`${PageRoute.Player}/${makeFakeMovie().id}`);

    render(
      <Provider store={mockStore({active: {movie: {...makeFakeMovie(), id: 2}}, service: {isDataLoading: false}})}>
        <PlayerScreen/>
      </Provider>
    );

    expect(screen.getByTestId('oval-loading')).toBeInTheDocument();
  });
});
