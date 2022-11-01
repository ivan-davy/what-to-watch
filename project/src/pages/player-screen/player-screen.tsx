import {MovieType} from '../../types/types';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {useEffect} from 'react';
import {fetchActiveDataAction} from '../../store/api-actions';
import LoadingSpinner from '../../components/loading/loading-spinner';

export default function PlayerScreen(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movie?.id.toString() !== params.id) {
      dispatch(fetchActiveDataAction(params.id as string));
    }
  }, []);

  const movie: MovieType | null = useAppSelector((state) => state.active.movie);
  const isLoading: boolean = useAppSelector((state) => state.service.isDataLoading);

  if (isLoading || movie?.id.toString() !== params.id) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="player">
      <video src="#" className="player__video" poster={movie?.backgroundImage}></video>

      <button onClick={() => navigate('/')} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{left: '0%'}}>Toggler</div>
          </div>
          <div className="player__time-value">0:00:00</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movie?.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
