import {BaseSyntheticEvent, useEffect, useRef, useState} from 'react';
import {MovieType} from '../../types/types';
import {useNavigate} from 'react-router-dom';
import {PageRoute} from '../../const';

export type VideoPlayerPropsType = {
  movie: MovieType;
}

const SECS_IN_HOUR = 3600;
const MILLISECS_IN_SEC = 1000;

export default function VideoPlayer({movie}: VideoPlayerPropsType): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current?.addEventListener('timeupdate', handleTimeUpdate);
    videoRef.current.pause();
  }, [isPlaying, timeRemaining]);

  const getPrettyRemainingTime = (): string => {
    if (timeRemaining > SECS_IN_HOUR) {
      return new Date(timeRemaining * MILLISECS_IN_SEC).toISOString().slice(11, 19);
    }
    return new Date(timeRemaining * MILLISECS_IN_SEC).toISOString().slice(14, 19);
  };

  const getProgress = (): number => {
    if (videoRef.current?.currentTime !== undefined && videoRef.current?.duration !== undefined) {
      return (videoRef.current?.currentTime / videoRef.current?.duration) * 100;
    }
    return 0;
  };

  const handleFullscreenClick = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    videoRef.current?.requestFullscreen();
  };

  const handlePlayPauseClick = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    setIsPlaying((prevState) => !prevState);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current?.currentTime !== undefined && videoRef.current?.duration !== undefined) {
      setTimeRemaining(videoRef.current?.duration - videoRef.current?.currentTime);
    }
  };

  return (
    <div className="player" style={{backgroundColor: '#000000'}}>
      <video src={movie.videoLink} poster={movie.previewImage} ref={videoRef} style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        position: 'relative'
      }}
      />

      <button onClick={() => navigate(`${PageRoute.Movie}/${movie.id}`)} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{left: `${getProgress()}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getPrettyRemainingTime()}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayPauseClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={`${isPlaying ? '#pause' : '#play-s'}`}></use>
            </svg>
            <span>{`${isPlaying ? 'Play' : 'Pause'}`}</span>
          </button>
          <div className="player__name">{movie?.name}</div>

          <button onClick={handleFullscreenClick} type="button" className="player__full-screen">
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
