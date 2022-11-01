import {Navigate} from 'react-router-dom';
import {PageRoute, AuthorizationStatus} from '../../const';

type PrivateRoutePropsType = {
  authorizationStatus: string;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRoutePropsType): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={PageRoute.SignIn} />
  );
}
