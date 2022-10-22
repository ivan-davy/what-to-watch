import {MovieType} from '../../types/types';
import {PageRoute} from '../../const';
import {Link} from 'react-router-dom';

type MovieCardPropsType = {
  movie: MovieType;
}

export default function MovieCard(props: MovieCardPropsType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.movie.previewImage} alt={props.movie.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${PageRoute.Movie}/${props.movie.id}`}>{props.movie.name}</Link>
      </h3>
    </article>
  );
}
