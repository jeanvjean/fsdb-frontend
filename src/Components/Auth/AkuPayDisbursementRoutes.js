import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUser } from '../../hooks/useUser';
import { ROLES } from '../Compositions/Sidebar/sidebarData';

const AkuPayDisbursementRoute = ({ component: Component }) => {

  const {user} = useUser()

  return (
    <>
      {
        user.user_type === ROLES.AKUPAY &&  (
          <Component />
        )
      }
      {
        user.user_type !== ROLES.AKUPAY && (
          <Redirect to={{ pathname: '/disbursements-logs' }} />     
        )
      }
    </>

  )
};

export default AkuPayDisbursementRoute;
