import {ReviewsType} from '../types/types';

export const reviewsMock: ReviewsType = [
  {
    'id': 1,
    'user': {
      'id': 16,
      'name': 'Mollie'
    },
    'rating': 3.8,
    'comment': 'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    'date': '2022-10-04T13:58:46.523Z'
  },
  {
    'id': 2,
    'user': {
      'id': 16,
      'name': 'Mollie'
    },
    'rating': 4.4,
    'comment': 'The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. ',
    'date': '2022-09-28T13:58:46.523Z'
  },
  {
    'id': 3,
    'user': {
      'id': 16,
      'name': 'Mollie'
    },
    'rating': 2.4,
    'comment': 'A movie that will take you to another world full of emotions.',
    'date': '2022-09-27T13:58:46.523Z'
  }
];
