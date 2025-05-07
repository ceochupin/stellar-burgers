import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from './ui/ProfileMenuUI';
import { useDispatch } from '@store';
import { logoutUser } from '@slices';

export const ProfileMenu = (): JSX.Element => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
