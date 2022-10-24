import {MovieType} from '../../types/types';
import {PageRoute} from '../../const';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type MovieCardPropsType = {
  movie: MovieType;
  isActive: boolean;
}

export default function MovieCard({movie, isActive}: MovieCardPropsType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" id={movie.id.toString()}>
      <div className="small-film-card__image">
        {
          isActive ?
            <VideoPlayer movie={movie} muted autoPlay/> :
            <img src={movie.previewImage} alt={movie.name} width="280" height="175"/>
        }

      </div>
      <h3 className="small-film-card__title" id={movie.id.toString()}>
        <Link className="small-film-card__link" to={`${PageRoute.Movie}/${movie.id}`}>{movie.name}</Link>
      </h3>
    </article>
  );
}
