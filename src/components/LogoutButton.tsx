import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/userSlice';
import Button from '../ui/Button';
import * as Icon from 'heroicons-react';
// Utils
import { app } from '../utils/firebase';

function LogoutButton() {
  const dispatch = useAppDispatch();

  const logOut = () => {
    app.auth().signOut();
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <Button variant="outlined" color="default" size="small" onClick={logOut}>
      <Icon.Logout />
    </Button>
  );
}

export default LogoutButton;
