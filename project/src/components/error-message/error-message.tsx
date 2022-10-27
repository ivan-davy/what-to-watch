import {useAppSelector} from '../../hooks/store-hooks';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.api.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
