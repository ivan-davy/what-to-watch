import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {BaseSyntheticEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {PageRoute} from '../../const';

export default function User(): JSX.Element {
  const authStatus: AuthorizationStatus = useAppSelector((state) => state.service.authStatus);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (authStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img onClick={() => navigate(PageRoute.MyList)} src={userData.avatarUrl as string} alt="User avatar" width="40" height="40"/>
          </div>
        </li>
        <li className="user-block__item">
          <a onClick={handleSignOut} className="user-block__link">Sign Out</a>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={PageRoute.SignIn} className="user-block__link">Sign In</Link>
      </li>
    </ul>
  );
}
