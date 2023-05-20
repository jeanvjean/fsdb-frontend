import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { utils } from '../api/utils';

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); 

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || '';
      if (token) {
        const data = await utils.getLoggedInUser();
        setRole(data?.data?.data?.user_type);
        setUser(data?.data?.data);
      }
      setLoading(false);
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem('token');
        setUser({});
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile()
  }, []);

  const value = useMemo(
    () => ({
      loading,
      role,
      setRole,
      setUser,
      user,
    }),
    [loading, role, setRole, setUser, user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
