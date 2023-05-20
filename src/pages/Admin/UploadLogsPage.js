import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'rebass'
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import {  E } from './SmsTransaction';
import { H3 } from '../../Components/GlobalStyles';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import { withRouter } from 'react-router-dom';
import { EntriesCard } from './Approvals';
import { beneficiaryUploadLogsAction } from '../../redux/actions/upload-beneficiary-account.action';
import BeneficiaryUploadTable from '../../Components/Compositions/Tables/BeneficiaryUploadTable';


const UploadLogs = () => {

  const { state } = useContext(SidebarContext);

  const [payload, setPayload] = useState({flagged: true})
  const [showCustom, setShowCustom] = useState(false);
  const [dates, setDates] = useState(null);

  const dispatch = useDispatch();

  const beneficiaryUploadLogs = useCallback(
    (params={}) => dispatch(beneficiaryUploadLogsAction(params)),
    [dispatch]
  );  

  const { uploadLogs, meta,loadingLogs } = useSelector(({ uploadBeneficiaryAccount }) => ({
    loadingLogs: uploadBeneficiaryAccount.loadingLogs,
    uploadLogs: uploadBeneficiaryAccount.uploadLogs,
    meta: uploadBeneficiaryAccount.meta,
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
    beneficiaryUploadLogs({flagged: true})
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
    beneficiaryUploadLogs({...payload, page: selected + 1})
  }

  useEffect(() => {
    beneficiaryUploadLogs(payload)
  }, [payload.type, payload.programme, payload.period, payload.page]);

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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Beneficiary Upload Logs</H3>
            <E.AllRecordsBtn>All Records</E.AllRecordsBtn>
          </E.FormNameWrapper>
          <TableSearchInput
            placeholder="Search by name, phone number"
            whiteBg
            noRadius
            name="s"
            width="300px"
            value={payload.s}
            onChange={(e) => setPayload({...payload, [e.target.name]: e.target.value})}
            handleSearch={(e) => {
              e.preventDefault()
              beneficiaryUploadLogs({...payload, s: payload.s})
            }}
            cancelSearch={() => {
              setPayload({...payload, s: ''})
              beneficiaryUploadLogs({...payload, s: ''});
            }}
          />
        </E.Header>                   

        <EntriesCard>
          <BeneficiaryUploadTable 
            data={uploadLogs} 
            loading={loadingLogs} 
            payload={payload} 
            meta={meta} 
            setPayload={setPayload} 
            beneficiaryUploadLogs={beneficiaryUploadLogs} 
            handlePagination={handlePagination}
          />
        </EntriesCard>
      </DashboardLayout>
    </Box>
  )
}

const Page = () => (
  <SidebarProvider>
    <UploadLogs />
  </SidebarProvider>
);


export default withRouter(Page)
