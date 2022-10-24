import {ReviewType} from '../types/types';

const getReview = (review: ReviewType): JSX.Element => (
  <div className="review" key={review.id}>
    <blockquote className="review__quote">
      <p className="review__text">
        {review.comment}
      </p>

      <footer className="review__details">
        <cite className="review__author">{review.user.name}</cite>
        <time className="review__date" dateTime="2016-12-24">{review.date}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);

export default function MovieReviews(reviews: ReviewType[]): JSX.Element {
  const reviewsArray = Object.values(reviews);
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsArray.slice(reviewsArray.length / 2, reviewsArray.length).map((review) => getReview(review))}
      </div>
      <div className="film-card__reviews-col">
        {reviewsArray.slice(0, reviewsArray.length / 2).map((review) => getReview(review))}
      </div>
    </div>
  );
}

