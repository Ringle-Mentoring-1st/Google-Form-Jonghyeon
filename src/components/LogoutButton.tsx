import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/userSlice';
import Button from '../ui/Button';
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
    <Button variant="outlined" color="primary" size="small" onClick={logOut}>
      로그아웃하기
    </Button>
  );
}

export default LogoutButton;
