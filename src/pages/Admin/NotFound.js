import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';

import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import NotFoundSVG from '../../Components/Elements/svg/NotFound';

const Image = styled.img`
  height: 70%;
  width: 70%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 2rem;
  text-decoration: capitalize;
  margin: 1em 0;
`;

const NotFoundPage = () => {
  const { state } = useContext(SidebarContext);

  return (
    <DashboardLayout state={state}>
      <Container>
        <NotFoundSVG />
        <Text>Sorry This Page Does not exist</Text>
      </Container>
    </DashboardLayout>
  );
};

const Page = () => (
  <SidebarProvider>
    <NotFoundPage />
  </SidebarProvider>
);

export default withRouter(Page);
