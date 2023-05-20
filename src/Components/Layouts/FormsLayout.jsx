import React from 'react';
import { connect } from 'react-redux';
import { DashboardContainer, Content, DashboardWrapper } from './Styles';
import FormsSidebar from 'components/compositions/Sidebar/FormsSidebar';
import styled from '@emotion/styled';
import DashboardHeader from '../Compositions/Header/DashboardHeader';

const FLayout = {};

FLayout.Header = styled(DashboardWrapper)`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
`;
FLayout.ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
FLayout.Content = styled(Content)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const FormsLayout = (props) => {
  const { children, state } = props;
  return (
    <DashboardContainer>
      <FLayout.ContentWrapper>
        <FLayout.Header sidebarOpen={state?.sidebarOpen || false}>
          <FormsSidebar />
          <DashboardHeader {...props} />
        </FLayout.Header>
        <FLayout.Content>{children}</FLayout.Content>
      </FLayout.ContentWrapper>
    </DashboardContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  ...user,
});

export default connect(mapStateToProps, {})(FormsLayout);
