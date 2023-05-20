/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import {
  Card,
  PrinterIcon,
  ExportIcon,
  CardHeader,
  TrashIcon,
  ReloadIcon,
  Button,
} from '../../Components/Elements';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { H3 } from '../../Components/GlobalStyles';
import { Search, E } from './SmsTransaction';
import SelectField from '../../Components/Elements/SelectField';
import ApprovalsTable from '../../Components/Compositions/Tables/ApprovalsTable';
import ApprovalModal from '../../Components/Compositions/Modals/ApprovalModal';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import { getSMSTransactionsAdminAction } from '../../redux/actions/transactions.actions';
import { getDateDifference } from '../../Components/utils';

export const EntriesCard = styled(Card)`
  border: 1px solid #ededed;
  box-shadow: 0 0 0;
  padding: 0;
  padding-bottom: 2rem;
  overflow: unset;

  .sticky {
    position: sticky;
    top: -2rem;
    z-index: 3;
    background-color: #ffffff;
  }
`;
export const EntriesButton = styled.button`
  border: 1px solid #3c3c3c;
  background: transparent;
  padding: 5px 1rem;
  font-size: ${(p) => p.theme.fontSizes.small};
  margin-right: 1rem;
`;
export const EntriesTrashIcon = styled(TrashIcon)`
  margin-top: -3px;
  margin-right: 5px;
  width: 1rem;
`;
export const EntriesFilterBy = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: ${(p) => p.theme.fontSizes.smaller};
`;
export const EntriesSelect = styled(SelectField)`
  width: 150px;
  margin-left: 1rem;
  font-size: ${(p) => p.theme.fontSizes.small};
`;

const Approvals = (props) => {
  const { state } = useContext(SidebarContext);
  const [period, setPeriod] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dates, setDates] = useState(null);
  const dispatch = useDispatch();

  const [filterPayload, setFilterPayload] = useState({})

  const fetchTransactions = useCallback(
    (filterPayload) => dispatch(getSMSTransactionsAdminAction(filterPayload)),
    [dispatch]
  );

  useEffect(() => {
    fetchTransactions(filterPayload);
  }, [filterPayload.period, filterPayload.status]);

  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      // setPeriod(e.target.value);
      setFilterPayload({...filterPayload, period: e.target.value})
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
      const payload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setFilterPayload({...filterPayload, period: getDateDifference(payload.start_date, payload.end_date)})
    }else{
      setFilterPayload({...filterPayload, period: ''})
    }
    setDates(dates);
  };

  return (
    <>
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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Pending Approvals</H3>
            <E.AllRecordsBtn>All Records</E.AllRecordsBtn>
          </E.FormNameWrapper>
          <TableSearchInput
            placeholder="Search by bank name, acc number, phone"
            whiteBg
            noRadius
            name="s"
            width="300px"
            value={filterPayload.s}
            onChange={(e) => setFilterPayload({...filterPayload, s:e.target.value})}
            handleSearch={(e) => {
              fetchTransactions({...filterPayload});
            }}
            cancelSearch={() => {
              // setSearchValue('')
              setFilterPayload({...filterPayload, s:''})
              fetchTransactions({...filterPayload, s: ''});
            }}
          />
        </E.Header>

        <EntriesCard>
          <ApprovalsTable period={period} search={searchValue}  filterPayload={filterPayload} setFilterPayload={setFilterPayload}/>
        </EntriesCard>
      </DashboardLayout>
    </>
  );
};

const Page = () => (
  <SidebarProvider>
    <Approvals />
  </SidebarProvider>
);

export default withRouter(Page);
