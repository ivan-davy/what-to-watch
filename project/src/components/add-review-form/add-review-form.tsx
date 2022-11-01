import React, {BaseSyntheticEvent, SyntheticEvent} from 'react';
import {NewReviewType} from '../../types/types';
import {postUserReviewAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {FormStatus} from '../../const';
import {StateType} from '../../types/state';

const defaultReview: NewReviewType = {
  comment: '',
  rating: null
};

export default function AddReviewForm(): JSX.Element {
  const [formState, setFormState] = React.useState(defaultReview);
  const [formSubmitState, setFormSubmitState] = React.useState(FormStatus.Available);
  const dispatch = useAppDispatch();
  const movieId = useAppSelector((state: StateType) => state.active.movie?.id) as number;

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
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={formSubmitState === FormStatus.Disabled}/>
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
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
            disabled={!(formState.comment.length > 50 && formState.comment.length < 400 && formState.rating !== null) || formSubmitState === FormStatus.Disabled}
          >Post
          </button>
        </div>

      </div>
    </form>
  );
}
