import {useEffect, useRef, useState} from 'react';
import {MovieType} from '../../types/types';

export type VideoPlayerMiniPropsType = {
  movie: MovieType;
  autoPlay: boolean;
}

export default function VideoPlayerMini({movie, autoPlay}: VideoPlayerMiniPropsType): JSX.Element {
  const [, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isVideoPlayerMounted = true;

    if (videoRef.current === null) {
      return;
    }
    videoRef.current.addEventListener('loadeddata', () => {
      if (isVideoPlayerMounted) {
        setIsLoading(false);
      }
    });
    if (autoPlay) {
      setTimeout(() => {
        if (videoRef.current !== null) {
          videoRef.current.play();
        }
      }, 1000);
      return;
    }
    videoRef.current.pause();
    return () => {
      isVideoPlayerMounted = false;
    };
  }, [autoPlay]);

  return (
    <video src={movie.previewVideoLink} poster={movie.previewImage} ref={videoRef} muted/>
  );
}
