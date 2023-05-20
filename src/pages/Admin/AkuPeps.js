/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { SearchIcon, CardHeader, Button } from '../../Components/Elements';
import styled from '@emotion/styled';
import { H3 } from '../../Components/GlobalStyles';
import { EntriesCard, } from './Approvals';
import AkuRepsTable from '../../Components/Compositions/Tables/AkuRepsTable';
import { getUsersAction } from '../../redux/actions/users.actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchInput from '../../Components/Elements/TableSearchInput';

export const Search = styled(SearchIcon)`
  margin: auto;
`;
export const E = {};

E.Header = styled.header`
  display: flex;
  padding: 1rem 0;
  margin: 2rem 0;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breaks.MD}) {
    display:block;
  }
`;

E.Button = styled(Link)`
  border: 1px solid #3c3c3c;
  background: transparent;
  padding: 0 0.5rem;
  font-size: ${(p) => p.theme.fontSizes.small};
  margin-left: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  
  &:hover {
    background: ${(p) => p.theme.colors.green5};
  }
  &:focus {
    outline: none;
  }
`;

E.OtherOptions = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

E.AllRecordsBtn = styled.button`
  background: rgba(119, 83, 243, 0.16);
  border: 1px solid #7753f3;
  padding: 0.3rem 0.8rem;
  font-size: ${(p) => p.theme.fontSizes.xSmall};
  margin: 0 1rem;
`;

E.FormNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

 
  
`;

const AkuPeps = (props) => {
  const { state } = useContext(SidebarContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({userType:"representative",})

  const fetchUsers = useCallback((period, userType) => dispatch(getUsersAction(period, userType)), [
    dispatch,
  ]);

  const { users = [], loading, meta } = useSelector(({ users }) => ({
    users: users.users,
    loading: users.loading,
    meta: users.userMeta
  }));

  const handlePagination = ({selected})=> {
    setPayload({...payload, page: selected +1})
  }

  useEffect(() => {
    fetchUsers({...payload});
  }, [payload.period, payload.userType, payload.page]);

  return (
    <DashboardLayout state={state}>
      <E.Header>
        <E.FormNameWrapper>
          <H3 style={{ margin: '0', fontWeight: '600' }}>Aku Reps</H3>
        </E.FormNameWrapper>
        <TableSearchInput
          placeholder="Search by Name, Email or User Type"
          whiteBg
          noRadius
          name="s"
          width="300px"
          value={payload.s}
          onChange={(event) => setPayload({...payload, [event.target.name]: event.target.value})}
          handleSearch={() => {
            fetchUsers(payload);
          }}
          cancelSearch={() => {
            setPayload({...payload, s:''})
            fetchUsers({...payload, s:''});
          }}
        />
      </E.Header>

      <EntriesCard>
        <CardHeader
          style={{
            borderBottom: '1px solid #D3D3D3',
            padding: '1rem 1.6rem',
          }}
        >
          <div>
            <Button
              onClick={() => {
                history.push('/dashboard/settings/add');
              }}
              color="white"
              bg="blue1"
            >
              Add Rep
            </Button>
          </div>
          {/* <EntriesFilterBy>
            Filter By
            <EntriesSelect
              name="userType"
              onChange={(event) => setPayload({...payload, [event.target.name]: event.target.value})}
              noRadius
            >
              <option defaultChecked value="">No Filters</option>
              <option value="administrator">Administrator</option>
              <option value="representative">Representative</option>
              <option value="partner">
                AKUPay Disbursement Service Rep
              </option>
            </EntriesSelect>
          </EntriesFilterBy> */}
        </CardHeader>
        <AkuRepsTable 
          data={users} 
          loading={loading} 
          routeType="aku-reps" 
          meta={meta}
          handlePagination={handlePagination}
        />
      </EntriesCard>
    </DashboardLayout>
  );
};

const Page = () => (
  <SidebarProvider>
    <AkuPeps />
  </SidebarProvider>
);

export default withRouter(Page);
