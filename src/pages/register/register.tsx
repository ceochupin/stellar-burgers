import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { registerUser } from '../../slices/user/user-actions';
import { useNavigate } from 'react-router-dom';
import {
  selectUserError,
  selectUserStatus
} from '../../slices/user/user-selectors';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const status = useSelector(selectUserStatus);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (status === 'succeeded' && !error && name && email) {
      navigate('/');
    }
  }, [status, error, name, email, navigate]);

  return (
    <>
      {!(status === 'succeeded') ? (
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
