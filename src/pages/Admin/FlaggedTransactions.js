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
import FlaggedTransactionsTable from '../../Components/Compositions/Tables/FlaggedTransactions';
import ApprovalModal from '../../Components/Compositions/Modals/ApprovalModal';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import { getFlaggedTransactionsAction } from '../../redux/actions/transactions.actions';
import { Box } from 'rebass';
import { utils } from '../../api/utils';

export const EntriesCard = styled(Card)`
  border: 1px solid #ededed;
  box-shadow: 0 0 0;
  padding: 0;
  padding-bottom: 2rem;
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

const FlaggedTransactions = (props) => {
  const { state } = useContext(SidebarContext);
  const [period, setPeriod] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [dates, setDates] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const [programmes, setProgrammes] = useState([])

  const [payload, setPayload] = useState({flagged: true})

  const fetchFlaggedTransactions = useCallback(
    (payload) => dispatch(getFlaggedTransactionsAction(payload)),
    [dispatch]
  );

  // useEffect(() => {
  //   if(payload.s) return fetchFlaggedTransactions(payload);
  // }, [payload.s]);'

  const fetchAllProgrammes = async () => {
    try {
      setProgrammes([])
      const res = await utils.fetchAllProgrammes()
      setProgrammes(res.data)
    } catch (error) {
      
    }
  } 

  useEffect(() => {
    fetchAllProgrammes()
  }, [])


  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setPayload({...payload, period: e.target.value});
    }
  };

  const handleRefreshPage = async () => {
    setDates([]);
    document.getElementById('date-range').selectedIndex = 0;
    fetchFlaggedTransactions({flagged: true});
  };

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const datePayload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      const date1 = new Date(datePayload.start_date);
      const date2 = new Date(datePayload.end_date);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      setPayload({...payload, period: diffDays})
    }else {
      setPayload({...payload, period: ''})
    }
   
    setDates(dates);
  };

  useEffect(() => {
    fetchFlaggedTransactions(payload)
  }, [payload.status, payload.programme]);

  useEffect(() => {
    fetchFlaggedTransactions()
  }, [])  



  const goBackToForms = () => {
    props.history.goBack();
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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Flagged Transactions</H3>
            <E.AllRecordsBtn>All Records</E.AllRecordsBtn>
          </E.FormNameWrapper>
          <TableSearchInput
            placeholder="Search by bank name, acc number"
            whiteBg
            noRadius
            name="s"
            width="300px"
            value={payload.s}
            onChange={(e) => setPayload({...payload, [e.target.name]: e.target.value})}
            handleSearch={() => {
              fetchFlaggedTransactions(payload);
            }}
            cancelSearch={() => {
              setPayload({...payload, s: ''})
              fetchFlaggedTransactions({...payload, s: ''});
            }}
          />
        </E.Header>

        <Box width={["17rem"]} mb="1rem">
          <SelectField
            label="Programme"
            // ref={dateRangeRef}
            id="date-range"
            name="programme"
            flex={0}
            noRadius
            whiteBg
            onChange={(e) => setPayload({...payload, [e.target.name]: e.target.value})}          
          >
          <option selected defaultChecked disabled>
            Select Programme
          </option>
          <option value =''>All</option>
          {
            programmes.length && programmes.map(p => <option value={p.id}>{p.name}</option>)
          }
        </SelectField>         
      </Box>          

        <EntriesCard>
          <FlaggedTransactionsTable period={period} payload={payload} setPayload={setPayload} />
        </EntriesCard>
      </DashboardLayout>
    </>
  );
};

const Page = () => (
  <SidebarProvider>
    <FlaggedTransactions />
  </SidebarProvider>
);

export default withRouter(Page);
