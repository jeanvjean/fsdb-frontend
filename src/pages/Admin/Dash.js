/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import EnumCards, { Enum } from '../../Components/Compositions/EnumCards/EnumCards';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import { Card, CardHeader, Text, Button } from '../../Components/Elements';
import AdminOverview from '../../Components/Compositions/Charts/AdminOverview';
import {
  getDashboardChartsAction,
  getDashboardSummaryAction,
} from '../../redux/actions/dashboard.actions';
import styled from '@emotion/styled';
import { Box, Flex } from 'rebass';
import SelectField from '../../Components/Elements/SelectField';
import { getDateDifference } from '../../Components/utils';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { ROLES } from '../../Components/Compositions/Sidebar/sidebarData';
import ReportsTable from '../../Components/Compositions/Tables/ReportsTable';
import { allTables } from './Reports';
import ExportModal from '../../Components/Compositions/Modals/ExportModal';
import {
  getReportsDisbursements,
  getReportsRetractions,
  getReportsCashedOut,
  exportRetractedTableDataAction,
  exportDisbursementTableDataAction,
  exportCashedoutTableDataAction,
} from '../../redux/actions/disbursements.actions';
import { toast } from 'react-toastify';
import { utils } from '../../api/utils';

const CardContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap:1rem;

  @media (max-width: 950px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }  

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const AdminDashboard = (props) => {
  const dispatch = useDispatch();
  const { state } = useContext(SidebarContext);
  const [period, setPeriod] = useState('30');
  const [showCustom, setShowCustom] = useState(false);
  const [dates, setDates] = useState(null);

  const [currTable, setCurrTable] = useState('');
  const [prog, setProg] = useState('')
  const [showExporDataModal, setShowExporDataModal] = useState(false);
  const [programmes, setProgrammes] = useState([])

  const {goBack} = useHistory()
  const {user, role} = useUser()

  const getDashboardSummary = useCallback((params) => dispatch(getDashboardSummaryAction(params)), [
    dispatch,
  ]);
  const getDashboardCharts = useCallback((period) => dispatch(getDashboardChartsAction(period)), [
    dispatch,
  ]);

  const getReportsDisbursementsFunc = useCallback((params) => dispatch(getReportsDisbursements(params)), [
    dispatch,
  ]);
  const getReportsRetractionFunc = useCallback((params) => dispatch(getReportsRetractions(params)), [dispatch]);
  const getReportsCashedOutFunc = useCallback((params) => dispatch(getReportsCashedOut(params)), [dispatch]);
  const exportRetractedTableData = useCallback((params = {}) => dispatch(exportRetractedTableDataAction(params)), [dispatch]);
  const exportDisbursementTableData = useCallback((params = {}) => dispatch(exportDisbursementTableDataAction(params)), [dispatch]);
  const exportCashedoutTableData = useCallback((params = {}) => dispatch(exportCashedoutTableDataAction(params)), [dispatch]);  

  const { 
    summary, 
    summaryLoading, 
    charts, 
    errorCharts, 
    errorSummary, 
    loadingChart, 
    disbursements, 
    reportsDisburesmentLoading,
    retractions,
    reportsRetractionLoading,
    cashedOut,
    reportsCashedOutLoading,
    exportingRetractedData
  } = useSelector(
    ({ dashboard, disbursement }) => ({
      summary: dashboard.summary,
      summaryLoading: dashboard.loadingSummary,
      charts: dashboard.charts,
      loadingChart: dashboard.loadingChart,
      errorCharts: dashboard.errorCharts,
      errorSummary: dashboard.errorSummary,
      disbursements: disbursement.reportsDisbursements,
      reportsDisburesmentLoading: disbursement.reportsDisburesmentLoading,
      retractions: disbursement.reportsRetraction,
      reportsRetractionLoading: disbursement.reportsRetractionLoading,
      cashedOut: disbursement.reportsCashedOut,
      reportsCashedOutLoading: disbursement.reportsCashedOutLoading,
      exportingRetractedData: disbursement.exportingRetractedData,      
    })
  );

  useEffect(() => {
    getDashboardSummary({period, programme_id: prog});
    if(role === ROLES.ADMIN){
      getDashboardCharts(period);
    }
  }, [getDashboardCharts, getDashboardSummary, period, prog, role]);

  useEffect(() => {
    if(role === ROLES.AKUPAY){
      getReportsRetractionFunc({period, programme_id: prog});
      getReportsCashedOutFunc({period, programme_id: prog})
      getReportsDisbursementsFunc({period, programme_id: prog})      
    }
  }, [period, prog]);

  useEffect(() => {
    if(role === ROLES.AKUPAY){
      fetchAllProgrammes()    
    }
  }, [role]);

  const handleToggle = () => {
    setCurrTable("")
    setShowExporDataModal(!showExporDataModal)
  }

  const fetchAllProgrammes = async () => {
    try {
      setProgrammes([])
      const res = await utils.fetchUserProgrammes()
      setProgrammes(res.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error.')
    }
  }

  const handleProceed = async (e) => {
    e.preventDefault()
    let res = {}
    switch (currTable) {

      case "disbursements":
        res = await exportDisbursementTableData()
        toast.success(res.data.message)          
        break;
        
      case "retracted":
        res = await exportRetractedTableData()
        toast.success(res.data.message)
        break; 
      
      case "cashedOut":
        res = await exportCashedoutTableData()
        toast.success(res.data.message)        
        break;             
        
      default:
        break;
    }
  }

  const handleShowExportModalData = (table) => {
    setCurrTable(table)
    setShowExporDataModal(true)
  }  

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
    getDashboardSummary(period);
    getDashboardCharts(period);
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

  return (
    <DashboardLayout state={state}>
      <Flex>
        <PageFiltersAndReload
          handleSelectDateRange={handleSelectDateRange}
          handleRefreshPage={handleRefreshPage}
          handleDateChange={handleDateChange}
          refreshing={false}
          showCustom={showCustom}
          dates={dates}
          period={period}
        />
      </Flex>

      {
        role === ROLES.AKUPAY && (
          <Box mt="2rem" width={[1, 1, 1/4]}>
            <SelectField
              label="Programme"
              onChange={(e) => setProg(e.target.value)}
              // ref={dateRangeRef}
              id="date-range"
              name="programme"
              flex={0}
              noRadius
              whiteBg
            >
              <option selected defaultChecked disabled>
                Select Programme
              </option>
              {
                programmes.length && programmes.map(p => <option value={p.id}>{p.name}</option>)
              }
            </SelectField>            
          </Box>
        )
      }

      <CardContainer mt="3rem" mb="5rem" width="100%">
        <EnumCards
          title="TOTAL SMS REQUESTS RECEIVED"
          countFrom={50}
          count={summary?.total_sms_request || 0}
          loading={summaryLoading}
        />
        <EnumCards
          title="TOTAL TRANSACTIONS RESOLVED"
          countFrom={150}
          count={summary?.total_transactions_resolved || 0}
          loading={summaryLoading}
        />
        <EnumCards
          title="TOTAL AMOUNT DISBURSED"
          countFrom={150}
          count={summary?.disbursed_amount || 0}
          loading={summaryLoading}
        />        
        {/* <EnumCards
          title="TOTAL SMS RESENT"
          countFrom={150}
          count={summary?.total_sms_resent || 0}
          color="#FF6F8B"
          loading={summaryLoading}
        /> */}
        <EnumCards
          title="TOTAL FUNDING RECEIVED"
          countFrom={150}
          count={summary?.total_funding || 0}
          color="#FF6F8B"
          loading={summaryLoading}
          // footer={<span>&#8358; {summary?.cashed_out_amount || 0}</span>}
        />    
               <EnumCards
          title="TOTAL AMOUNT CASHED OUT"
          countFrom={150}
          count={summary?.cashed_out_amount || 0}
          color="#FF6F8B"
          loading={summaryLoading}
        />  
        <EnumCards
          title="TOTAL BENEFICIARIES"
          countFrom={150}
          count={summary?.cashed_out || 0}
          color="#FF6F8B"
          loading={summaryLoading}
        />               
      </CardContainer>

        {
          role === ROLES.ADMIN && (
            <Card>
              <CardHeader>
                <Text>OVERVIEW</Text>
              </CardHeader>
              <AdminOverview data={charts} loading={loadingChart} />
            </Card>            
          )
        }

        {
          role === ROLES.AKUPAY && (
            <Box mb="10rem">
              <Box>
                <ReportsTable
                  tableTitle="Disbursements"
                  columns={allTables.disbursement}
                  data={disbursements || []}
                  loading={reportsDisburesmentLoading}
                  tableHeaderAction={
                    <Flex justifyContent="flex-end">
                      <Button onClick={(e) =>{
                        e.preventDefault()
                        handleShowExportModalData("disbursements")
                      }} bg="black" color="white">
                        EXPORT LIST
                      </Button>                    
                    </Flex>
                  }            
                />
              </Box>

              <Box>
                <ReportsTable
                  tableTitle="RETRACTED"
                  columns={allTables.retracted}
                  data={retractions || []}
                  loading={reportsRetractionLoading}
                  tableHeaderAction={
                    <Flex justifyContent="flex-end" width="100%">
                      <Button onClick={(e) =>{
                        e.preventDefault()
                        handleShowExportModalData("retracted")
                      }} bg="black" color="white">
                        EXPORT LIST
                      </Button>                    
                    </Flex>
                  }                
                />
              </Box>

              <Box>
                <ReportsTable
                  tableTitle="CASHED OUT"
                  columns={allTables.cashed_out}
                  data={cashedOut || []}
                  loading={reportsCashedOutLoading}
                  tableHeaderAction={
                    <Flex justifyContent="flex-end">
                      <Button onClick={(e) =>{
                        e.preventDefault()
                        handleShowExportModalData("cashedOut")
                      }} bg="black" color="white">
                        EXPORT LIST
                      </Button>                     
                    </Flex>
                  }                 
                />
              </Box>                                
            </Box>
          )
        }

      {showExporDataModal && (
        <ExportModal 
          toggleModal={handleToggle}
          proceedButtonText="Export"
          handleProceed={handleProceed}
          is_loading={exportingRetractedData}
          onChange={(e) => false}
          error={""}
          setError={() => false}
        />
        )
      }        
    </DashboardLayout>
  );
};

const Dashboard = () => (
  <SidebarProvider>
    <AdminDashboard />
  </SidebarProvider>
);

export default Dashboard;
