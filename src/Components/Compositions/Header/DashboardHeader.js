import React, { useContext } from 'react';
import styled from '@emotion/styled';

import SidebarProvider, { SidebarContext } from '../../../context/SidebarContext';
import Navbar from './Navbar';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
`;

export const Img = styled.img`
  height: 20px;
  width: 18px;
  margin-right: 1rem;
  margin-bottom: 2px;
`;

export const DashboardBreadcrumb = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DashboardHeader = (props) => {
  const { dispatch } = useContext(SidebarContext);

  return (
    <SidebarProvider>
      <Header>
        <Navbar toggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })} {...props} />
      </Header>
    </SidebarProvider>
  );
};

export default DashboardHeader;
