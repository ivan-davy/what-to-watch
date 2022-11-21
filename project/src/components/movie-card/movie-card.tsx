import {MovieType} from '../../types/types';
import {PageRoute} from '../../const';
import {Link, useNavigate} from 'react-router-dom';
import VideoPlayerMini from '../video-player-mini/video-player-mini';

type MovieCardPropsType = {
  movie: MovieType;
  isActive: boolean;
}

export default function MovieCard({movie, isActive}: MovieCardPropsType): JSX.Element {
  const navigate = useNavigate();
  return (
    <article className="small-film-card catalog__films-card" id={movie.id.toString()}>
      <div className="small-film-card__image" onClick={() => navigate(`/movie/${movie.id}`)}>
        {
          isActive ?
            <VideoPlayerMini movie={movie} autoPlay/> :
            <img src={movie.previewImage} alt={movie.name} width="280" height="175"/>
        }

      </div>
      <h3 className="small-film-card__title" id={movie.id.toString()}>
        <Link className="small-film-card__link" to={`${PageRoute.Movie}/${movie.id}`}>{movie.name}</Link>
      </h3>
    </article>
  );
}
