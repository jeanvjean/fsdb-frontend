import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'rebass'
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import {  E } from './SmsTransaction';
import { H3 } from '../../Components/GlobalStyles';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import SelectField from '../../Components/Elements/SelectField';
import { withRouter } from 'react-router-dom';
import { EntriesCard } from './Approvals';
import FlaggedTransactionsapprovalTable from '../../Components/Compositions/Tables/FlaggedTransactionsapprovalTable';
import { getAllApprovedFlaggedTransactionsAction } from '../../redux/actions/disbursements.actions';
import {
  getAllProgrammesAction
} from '../../redux/actions/dashboard.actions';

const FlaggedTransactionsApproval = () => {

  const { state } = useContext(SidebarContext);

  const [payload, setPayload] = useState({flagged: true})
  const [showCustom, setShowCustom] = useState(false);
  const [dates, setDates] = useState(null);

  const dispatch = useDispatch();

  const getAllApprovedFlaggedTransactions = useCallback(
    (params) => dispatch(getAllApprovedFlaggedTransactionsAction(params)),
    [dispatch]
  );  
  const getAllProgrammes = useCallback((period) => dispatch(getAllProgrammesAction(period)), [
    dispatch,
  ]);    

  const { data, loading, meta, programmes } = useSelector(({ disbursement, dashboard }) => ({
    data: disbursement.flaggedTrasactions,
    loading: disbursement.fetchingFlaggedTrasactions,
    meta: disbursement.flaggedTrasactionMeta,
    fetchingProgrammes: dashboard.fetchingProgrammes,
    programmes: dashboard.programmes,
  }));  

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
    getAllApprovedFlaggedTransactions({flagged: true})
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

  const handlePagination = ({selected}) => {
    getAllApprovedFlaggedTransactions({...payload, page: selected + 1})
  }

  useEffect(() => {
    const {status, programme, period, page} = payload
    if(programme || status || period || page){
      getAllApprovedFlaggedTransactions(payload)
    }
  }, [payload.status, payload.programme, payload.period, payload.page]);

  useEffect(() => {
    getAllApprovedFlaggedTransactions(payload)
    getAllProgrammes()
  }, [])

  return (
    <Box>
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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Flagged Transactions Approval</H3>
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
            handleSearch={(e) => {
              e.preventDefault()
              getAllApprovedFlaggedTransactions({...payload, s: payload.s})
            }}
            cancelSearch={() => {
              setPayload({...payload, s: ''})
              getAllApprovedFlaggedTransactions({...payload, s: ''});
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
          <FlaggedTransactionsapprovalTable 
            data={data} 
            loading={loading} 
            payload={payload} 
            meta={meta} 
            setPayload={setPayload} 
            getAllApprovedFlaggedTransactions={getAllApprovedFlaggedTransactions} 
            handlePagination={handlePagination}
          />
        </EntriesCard>
      </DashboardLayout>
    </Box>
  )
}

const Page = () => (
  <SidebarProvider>
    <FlaggedTransactionsApproval />
  </SidebarProvider>
);


export default withRouter(Page)
