import React, { SyntheticEvent, useState } from 'react';
import { RegisterUI } from './ui/RegisterUI';
import { useDispatch, useSelector } from '@redux-store';
import { registerUser, selectAuthError } from '@slices';

export const Register = (): JSX.Element => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError) || undefined;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUser({ name, email, password }));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
