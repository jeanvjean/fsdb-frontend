import styled from '@emotion/styled';
import React, { useContext } from 'react'
import { useHistory, withRouter } from 'react-router-dom';
import { Box } from 'rebass'
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';

const SettingsCard = styled(Box)`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bg }) => bg};
  cursor: pointer;
  color: #fff;
`;

const SettingsWrapper = styled(Box)`
display: grid;
grid-template-columns: 20rem 20rem;
grid-gap: 2rem;

@media (max-width: 1304px) {
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
@media (max-width: 750px) {
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}  
`;

const SettingsPage = () => {

  const { state } = useContext(SidebarContext);
  const {push}  = useHistory()

  return (
    <DashboardLayout state={state}>

      <SettingsWrapper>
        <SettingsCard width={[1, 1, 12 / 12]} bg="#00CFE6" onClick={() => push(`/dashboard/settings/add`)}>
          Add User
        </SettingsCard>            
        <SettingsCard width={[1, 1, 12 / 12]} bg="#4433A6" onClick={() => push(`/dashboard/settings/manage-users`)}>
          Manage Users
        </SettingsCard> 
        <SettingsCard width={[1, 1, 12 / 12]} bg="#4433A6" onClick={() => push(`/dashboard/settings/sms`)}>
          SMS
        </SettingsCard>     
        <SettingsCard width={[1, 1, 12 / 12]} bg="#00CFE6" onClick={() => push(`/dashboard/settings/add-programme`)}>
          Manage Programmes
        </SettingsCard>                 
      </SettingsWrapper>


    </DashboardLayout>
  )
}

const Page = () => (
  <SidebarProvider>
    <SettingsPage />
  </SidebarProvider>
);


export default withRouter(Page)
