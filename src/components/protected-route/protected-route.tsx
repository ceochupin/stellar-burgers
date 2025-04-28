import { JSX } from 'react';
import { Preloader } from '@ui';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): JSX.Element => {
  if (!onlyUnAuth) {
    return <Preloader />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
