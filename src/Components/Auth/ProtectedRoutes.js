import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { Flex } from 'rebass';
import { Spinner } from '../Elements/Spinner';

const ProtectedRoute = ({ component: Component }) => {
  const { user, loading } = useUser();

  const {push} = useHistory();

  if (loading) return (
    <Flex height="100vh" width="100%" alignItems="center" justifyContent="center">
      <Spinner color="black" />
    </Flex>
  )
  if (Boolean(Object.keys(user).length)) push('/dashboard');

  return (
    <Route
      render={renderProps => (
        <Component {...renderProps} />
      )}
    />
  );
};

export default ProtectedRoute;
