/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import { SearchIcon, CardHeader, Button } from '../../Components/Elements';
import styled from '@emotion/styled';
import { H3 } from '../../Components/GlobalStyles';
import { EntriesCard, EntriesFilterBy, EntriesSelect } from './Approvals';
import AllTransactionsTable from '../../Components/Compositions/Tables/AllTransactions';
import { getAllTransactionsAction } from '../../redux/actions/transactions.actions';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import { getDateDifference } from '../../Components/utils';
import { useUser } from '../../hooks/useUser';
import { ROLES } from '../../Components/Compositions/Sidebar/sidebarData';
import TransactionStatusLegend from '../../Components/Compositions/Modals/TransactionStatusLegend';

export const Search = styled(SearchIcon)`
  margin: auto;
`;
export const E = {};

E.Header = styled.header`
  display: flex;
  padding: 1rem 0;
  margin: 2rem 0;
  justify-content: space-between;
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

const AllTransactions = (props) => {
  const { state } = useContext(SidebarContext);
  const [period, setPeriod] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [dates, setDates] = useState(null);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const [showLegendStatus, setShowLegendStatus] = useState(false)

  const {user} = useUser()

  const dispatch = useDispatch();
  const [payload, setPayload] = useState({})

  const fetchDashboardSummaries = async (period, data) => {};
  const fetchTransactions = useCallback(
    (params) => dispatch(getAllTransactionsAction(params)),
    [dispatch]
  );

  const { data, loading, meta } = useSelector(({ smsTransactions }) => ({
    data: smsTransactions.allTransactions,
    meta: smsTransactions.allTransactionsMeta,
    loading: smsTransactions.loadingAllTransactions,
  }));

  useEffect(() => {
    fetchDashboardSummaries();
    fetchTransactions(payload);
  }, [payload.period, payload.status, payload.period]);

  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setPeriod(e.target.value);
      setPayload({...payload, period: e.target.value})
    }
  };
  const handleRefreshPage = async () => {
    setDates([]);
    document.getElementById('date-range').selectedIndex = 0;
    fetchTransactions({})
  };

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const datePayload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setPayload({...payload, period: getDateDifference(datePayload.start_date, datePayload.end_date)})
    }
    setDates(dates);
  };

  const handlePagination = ({selected}) => {
    setPayload({...payload, page: selected + 1})
  }

  const goBackToForms = () => {
    props.history.goBack();
  };

  return (
    <DashboardLayout state={state} disableDashoardRoute={user.user_type === ROLES.AKUPAY}>
      <PageFiltersAndReload
        handleSelectDateRange={handleSelectDateRange}
        handleRefreshPage={handleRefreshPage}
        handleDateChange={handleDateChange}
        refreshing={false}
        showCustom={showCustom}
        dates={dates}
      />

      <E.Header>
        <E.FormNameWrapper>
          <H3 style={{ margin: '0', fontWeight: '600' }}>All Transactions</H3>
        </E.FormNameWrapper>
        <TableSearchInput
          placeholder="Search by Account Name, Account Number or Bank Name"
          whiteBg
          noRadius
          name="s"
          width="300px"
          value={payload.s}
          onChange={(e) => setPayload({...payload, s: e.target.value})}
          handleSearch={() => {
            fetchTransactions(payload);
          }}
          cancelSearch={() => {
            setPayload({...payload, s: ""})
            fetchTransactions({...payload, s: ""})
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
        <Button onClick={(e) =>{
          e.preventDefault()
          setShowLegendStatus(true)
        }} bg="black" color="white">
          STATUS LEGEND
        </Button> 

          <EntriesFilterBy>
            Filter By
            <EntriesSelect name="status" onChange={(e) => setPayload({...payload, status: e.target.value}) } noRadius>
              <option value="" defaultChecked>No Filters</option>
              <option value="paid">Paid</option>
              <option value="not_paid">Not Paid</option>
              <option value="pending">Pending</option>
            </EntriesSelect>
          </EntriesFilterBy>
        </CardHeader>
        <AllTransactionsTable data={data} meta={meta} loading={loading} handlePagination={handlePagination}/>
      </EntriesCard>

      {
        showLegendStatus &&  (
          <TransactionStatusLegend close={() => setShowLegendStatus(false)} />
        )
      }      
    </DashboardLayout>
  );
};

const Page = () => (
  <SidebarProvider>
    <AllTransactions />
  </SidebarProvider>
);

export default withRouter(Page);
