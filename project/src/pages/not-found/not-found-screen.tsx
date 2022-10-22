import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';

export default function NotFoundScreen (): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Page not found</h1>
      </header>

      <div className="user-page__title">
        <h1 className="user-page__head" style={{fontSize: '100px'}}>404</h1>
        <Link to="/" className="sign-in__link">Return to home page</Link>
      </div>

    </div>
  );
}
