/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { DashboardContainer, DashboardWrapper, Content } from './Styles';
import { useHistory } from 'react-router-dom';
import MainSidebar from '../Compositions/Sidebar/MainSidebar';
import DashboardHeader from '../Compositions/Header/DashboardHeader';
import { useUser } from '../../hooks/useUser';

const DashboardLayout = (props) => {
  const history = useHistory();
  const {loading} = useUser()
  const { state, children } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history.location.pathname]);

  if(loading) return 'loading'

  return (
    <>
    <React.Suspense fallback={<div>loading</div>}>
      <DashboardContainer>
        <MainSidebar />
        <DashboardWrapper sidebarOpen={state.sidebarOpen}>
          <DashboardHeader {...props} />
            <Content>{children}</Content>
        </DashboardWrapper>
      </DashboardContainer>
    </React.Suspense>

    </>
  );
};

export default DashboardLayout;
