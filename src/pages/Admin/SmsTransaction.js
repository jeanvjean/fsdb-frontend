/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import { SearchIcon } from '../../Components/Elements';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { H3 } from '../../Components/GlobalStyles';
import withSelections from 'react-item-select';
import SmsTxns from '../../Components/Compositions/Tables/SmsTxns';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import { getSMSTransactionsRepAction } from '../../redux/actions/transactions.actions';
import { getDateDifference } from '../../Components/utils';

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
    margin: 1rem 0;
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
  &:focus{
    outline: none;
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
  &:focus{
    outline: none;
  }
`;

E.FormNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breaks.MD}) {
    margin: 1rem 0;
  }
`;

const SmsTransaction = (props) => {
  const { state } = useContext(SidebarContext);
  const [period, setPeriod] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [dates, setDates] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const fetchDashboardSummaries = async (period, data) => {};

  const fetchTransactions = useCallback(
    (period, search) => dispatch(getSMSTransactionsRepAction(period, search)),
    [dispatch]
  );

  const { data, loading, error, meta } = useSelector(({ smsTransactions }) => ({
    data: smsTransactions.transactionsDataRep,
    meta: smsTransactions.transactionsDataRepMeta,
    loading: smsTransactions.loading,
  }));

  useEffect(() => {
    fetchDashboardSummaries();
    fetchTransactions(period);
  }, [fetchTransactions, period]);

  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setPeriod(e.target.value);
    }
  };
  const handleRefreshPage = async () => {
    // document.getElementById('date-range').selectedIndex = 0;
    fetchDashboardSummaries();
    fetchTransactions("");    
  };

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const payload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setPeriod(getDateDifference(payload.start_date, payload.end_date))
    }else{
      setPeriod(0)
    }
    setDates(dates);
  };

  const goBackToForms = () => {
    props.history.goBack();
  };

  return (
    <DashboardLayout state={state}>
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
          <H3 style={{ margin: '0', fontWeight: '600' }}>SMS Transactions</H3>
          <E.AllRecordsBtn>All Records</E.AllRecordsBtn>
        </E.FormNameWrapper>
        <TableSearchInput
          placeholder="Search by bank name, acc number, phone"
          whiteBg
          noRadius
          name="s"
          width="300px"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          handleSearch={() => {
            fetchTransactions('30', searchValue);
          }}
          cancelSearch={() => {
            setSearchValue('')
            fetchTransactions('', searchValue);
          }}
        />
      </E.Header>
      <SmsTxns data={data} meta={meta} period={period} />
    </DashboardLayout>
  );
};

const Page = () => (
  <SidebarProvider>
    <SmsTransaction />
  </SidebarProvider>
);

export default withSelections(withRouter(Page));
