export type ShowMorePropsType = {
  onClick: () => void;
}

export default function ShowMore({onClick}: ShowMorePropsType): JSX.Element {
  return (
    <div className="catalog__more">
      <button onClick={onClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}
