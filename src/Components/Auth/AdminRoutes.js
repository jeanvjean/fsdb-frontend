import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUser } from '../../hooks/useUser';

const AdminRoute = ({ component: Component }) => {
  const {user} = useUser()
  return user.user_type === 'administrator' ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: '/dashboard' }} />
  );
};

export default AdminRoute;
