import { SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import { registerUser, selectUserError, selectUserStatus } from '@slices';
import { Preloader } from '@ui';

export const Register = (): JSX.Element => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const loading = useSelector(selectUserStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (!loading && !error && name && email) {
      navigate('/');
    }
  }, [loading, error, name, email, navigate]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText=''
          email={email}
          userName={name}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
