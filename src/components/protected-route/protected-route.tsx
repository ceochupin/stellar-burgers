import { JSX } from 'react';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { selectIsAuthChecked } from '../../slices/user/user-selectors';

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

  // if (isAuthChecked) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  if (onlyUnAuth) {
    const toFrom = location.state || { pathname: '/' };
    return <Navigate to={toFrom} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
