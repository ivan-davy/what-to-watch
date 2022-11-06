import React, {BaseSyntheticEvent, SyntheticEvent} from 'react';
import {NewReviewType} from '../../types/types';
import {postUserReviewAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {FormStatus} from '../../const';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;
const STARS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const;

const defaultReview: NewReviewType = {
  comment: '',
  rating: null
};

export default function AddReviewForm(): JSX.Element {
  const [formState, setFormState] = React.useState(defaultReview);
  const [formSubmitState, setFormSubmitState] = React.useState(FormStatus.Available);
  const dispatch = useAppDispatch();
  const movieId = useAppSelector((state) => state.active.movie?.id) as number;

  const handleFormChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;
    if (target.name === 'review-text') {
      setFormState({...formState, comment: target.value});
    }
    if (target.name === 'rating') {
      setFormState({...formState, rating: parseInt(target.value, 10)});
    }
  };

  const handleFormSubmit = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    setFormSubmitState(FormStatus.Disabled);
    dispatch(postUserReviewAction({userReview: formState, setFormSubmitStateCb: setFormSubmitState, activeId: movieId}));
  };

  return (
    <form className="add-review__form" onChange={handleFormChange}>
      <div className="rating">
        <div className="rating__stars">

          {STARS.map((star: number) => (
            <React.Fragment key={`${star}-rc`}>
              <input key={`${star}-inp`} className="rating__input" id={`star-${star}`} type="radio" name="rating"
                value={`${star}`} disabled={formSubmitState === FormStatus.Disabled}
              />
              <label key={`${star}-lbl`} className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
            </React.Fragment>))}

        </div>
      </div>

      <div className="add-review__text" style={{backgroundColor: '#FFFFFF', opacity: '65%'}}>
        <textarea className="add-review__textarea" name="review-text" id="review-text"
          placeholder="Review text" defaultValue={formState.comment}
        >
        </textarea>
        <div className="add-review__submit">
          <button onClick={handleFormSubmit}
            className="add-review__btn"
            type="submit"
            disabled={!(formState.comment.length > MIN_COMMENT_LENGTH &&
              formState.comment.length < MAX_COMMENT_LENGTH &&
              formState.rating !== null) ||
              formSubmitState === FormStatus.Disabled}
          >Post
          </button>
        </div>

      </div>
    </form>
  );
}
