import { JSX } from 'react';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import {
  selectIsAuthChecked,
  selectIsAuthUser
} from '../../slices/user/user-selectors';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): JSX.Element => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuthUser = useSelector(selectIsAuthUser);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthUser) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthUser) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
