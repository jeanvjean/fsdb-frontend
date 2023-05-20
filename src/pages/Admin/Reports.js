/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from '../../api/utils';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import EnumCards, { Enum } from '../../Components/Compositions/EnumCards/EnumCards';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import { Card, Button } from '../../Components/Elements';
import { toastMessage } from '../../Components/Elements';
import { CheckmarkCircle } from '../../Components/Elements/Icons';
import PasswordInput from '../../Components/Auth/PasswordInput';
import ReportsTable from '../../Components/Compositions/Tables/ReportsTable';
import AddFundsModal from '../../Components/Compositions/Modals/AddFundsModal';
import AddFundingBandModal from '../../Components/Compositions/Modals/AddBandsModal';
import { Approval } from '../../Components/Compositions/Modals/ApprovalModal';
import GenericModal from '../../Components/Compositions/Modals/GenericModal';
import {
  getDisbursementsReportSummary,
  getDisbursementsFundingData,
  getReportsDisbursements,
  getReportsRetractions,
  getReportsCashedOut,
  exportRetractedTableDataAction,
  exportFundingTableDataAction,
  exportDisbursementTableDataAction,
  exportCashedoutTableDataAction,
} from '../../redux/actions/disbursements.actions';
import styled from '@emotion/styled';
import { Box, Flex } from 'rebass';
import SelectField from '../../Components/Elements/SelectField';
import { getDateDifference } from '../../Components/utils';
import UploadBeneficiariesModal from '../../Components/Compositions/Modals/UploadBeneficiariesModal';
import UploadBeneficiariesAccountModal from '../../Components/Compositions/Modals/UploadBeneficiariesAccountModal';
import ExportModal from '../../Components/Compositions/Modals/ExportModal';
import { E } from './ManageProgramme';
import { toast } from 'react-toastify';

const CardContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

const FilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  // justify-content: space-between;
  gap: 1rem;
  width: 90%;
  margin: 0 0 3rem 0;
  margin-top: 2rem;
  flex-wrap: wrap;
  @media (max-width: 940px) {
    display: box;
  }  
`;

export const allTables = {
  funding: [
    // { accessor: 'id', Header: 'Funding ID' },
    { accessor: 'first_name', Header: 'First Name' },
    { accessor: 'last_name', Header: 'Last Name' },
    { accessor: 'programme_name', Header: 'Programme Name' },
    { accessor: 'amount', Header: 'Funding Amount', Cell:({value}) => value ? parseInt(value, 10).toLocaleString() : value  },
    { accessor: (row) => new Date(row.created_at).toGMTString(), Header: 'Date Funded' },
  ],
  disbursement: [
    {
      accessor: 'amount',
      Header: 'Loan Amount (Band)',
      Cell: ({ value }) =>
        value ? (
          ['Total Disbursed', 'Unique'].includes(value) ? (
            value
          ) : (
            <span>&#8358; {value}</span>
          )
        ) : (
          'N/A'
        ),
    },
    { accessor: 'beneficiaries', Header: 'Count Of Beneficiaries' },
    {
      accessor: 'disbursed_amount',
      Header: 'Disbursed Amount',
      Cell: ({ value }) => (value ? <span>&#8358; {value}</span> : 'N/A'),
    },
  ],
  retracted: [
    {
      accessor: 'amount',
      Header: 'Loan Amount (Band)',
      Cell: ({ value }) =>
        value ? (
          ['Total Retracted', 'Unique'].includes(value) ? (
            value
          ) : (
            <span>&#8358; {value}</span>
          )
        ) : (
          'N/A'
        ),
    },
    { accessor: 'beneficiaries', Header: 'Count Of Retracted Funds' },
    {
      accessor: 'disbursed_amount',
      Header: 'Amount Retracted',
      Cell: ({ value }) => (value ? <span>&#8358; {value}</span> : 'N/A'),
    },
  ],
  cashed_out: [
    {
      accessor: 'amount',
      Header: 'Loan Amount (Band)',
      Cell: ({ value }) =>
        value ? (
          ['Total Cashed Out', 'Unique'].includes(value) ? (
            value
          ) : (
            <span>{value}</span>
          )
        ) : (
          'N/A'
        ),
    },
    { accessor: 'beneficiaries', Header: 'Count Of Successful Cashout' },
    { accessor: 'disbursed_amount', Header: 'Amount Cashed Out',  Cell: ({ value }) => (value ? <span>&#8358; {value}</span> : 'N/A'), },
  ],
};


const ReportsDashboard = (props) => {
  const dispatch = useDispatch();
  const { state } = useContext(SidebarContext);
  const [period, setPeriod] = useState('30');

  const [showCustom, setShowCustom] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUploadBeneficiaryModal, setShowUploadBeneficiaryModal] = useState(false);
  const [showExporDataModal, setShowExporDataModal] = useState(false);  
  const [loading, setLoading] = useState({
    confirmPassword: false,
  });
  const [fundingState, setFundingState] = useState({
    confirmPassword: '',
    passwordConfirmed: false,
    fundingAdded: false,
    amount: 0,
    funded_at: null,
    addingFunding: false,
    fundingBand: {
      amount: 0,
    },
    currentProcess: 'fundingBand',
  });
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showAddFundingBandModal, setShowAddFundingBandModal] = useState(false);
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] = useState(false);
  const [dates, setDates] = useState(null);
  const [dateRange, setDateRange] = useState({});

  const [currTable, setCurrTable] = useState('');

  const getDashboardSummary = useCallback((params={}) => dispatch(getDisbursementsReportSummary(params)), [
    dispatch,
  ]);

  const getDisbursementsFunding = useCallback((params) => dispatch(getDisbursementsFundingData(params)), [
    dispatch,
  ]);

  const getReportsDisbursementsFunc = useCallback((params) => dispatch(getReportsDisbursements(params)), [
    dispatch,
  ]);
  const getReportsRetractionFunc = useCallback((params) => dispatch(getReportsRetractions(params)), [dispatch]);
  const getReportsCashedOutFunc = useCallback((params) => dispatch(getReportsCashedOut(params)), [dispatch]);
  const exportRetractedTableData = useCallback((params = {}) => dispatch(exportRetractedTableDataAction(params)), [dispatch]);
  const exportFundingTableData = useCallback((params = {}) => dispatch(exportFundingTableDataAction(params)), [dispatch]);
  const exportDisbursementTableData = useCallback((params = {}) => dispatch(exportDisbursementTableDataAction(params)), [dispatch]);
  const exportCashedoutTableData = useCallback((params = {}) => dispatch(exportCashedoutTableDataAction(params)), [dispatch]);

  const [programmes, setProgrammes] = useState([])
  const [prog_id, setProg_id] = useState('')

  const { 
    summary, 
    retractions, 
    funding, 
    fundingMeta, 
    disbursements, 
    cashedOut, 
    summaryLoading, 
    reportsFundingLoading,
    reportsCashedOutLoading, 
    reportsRetractionLoading,
    reportsDisburesmentLoading,
    exportingRetractedData
  } = useSelector(
    ({ disbursement }) => {
      return ({
        summary: disbursement.reportsSummary,
        summaryLoading: disbursement.reportsLoading,
        funding: disbursement.reportsFunding,
        fundingMeta: disbursement.reportsFundingMeta,
        reportsFundingLoading: disbursement.reportsFundingLoading,
        disbursements: disbursement.reportsDisbursements,
        reportsDisburesmentLoading: disbursement.reportsDisburesmentLoading,
        retractions: disbursement.reportsRetraction,
        reportsRetractionLoading: disbursement.reportsRetractionLoading,
        cashedOut: disbursement.reportsCashedOut,
        reportsCashedOutLoading: disbursement.reportsCashedOutLoading,
        exportingRetractedData: disbursement.exportingRetractedData,
      })
    }
  );

  useEffect(() => {
    getDashboardSummary({});
    getDisbursementsFunding({});
    getReportsDisbursementsFunc({});
    getReportsRetractionFunc({});
    getReportsCashedOutFunc({});
  }, []);

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
    getDashboardSummary({});
    getDisbursementsFunding({});
    getReportsDisbursementsFunc({});
    getReportsRetractionFunc({});
    getReportsCashedOutFunc({});
  };

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

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const payload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setDateRange(payload)
      const diff = getDateDifference(payload.start_date, payload.end_date)
      setPeriod(diff)
    }
    setDates(dates)
  };

  const handleAddFunding = (amount, funded_at) => {

    if(!amount || !funded_at) return toastMessage({type:"error", message:"Please enter all required fields."})
    if (!prog_id) return toastMessage({
      type: 'error',
      message: 'Please select a programme.',
    });   

    setShowConfirmPasswordModal(true);
    setFundingState({ amount, funded_at, currentProcess: 'fundingAmount' });
  };

  const handleAddFundingBand = (fundingBand) => {
    if (!prog_id) return toastMessage({
      type: 'error',
      message: 'Please select a programme.',
    });      

    if(!fundingBand.amount) return toastMessage({type:"error", message:"Please enter Funding Band."}) 
 
    setShowConfirmPasswordModal(true);
    setFundingState((s) => ({ ...s, fundingBand, currentProcess: 'fundingBand' }));
  };

  const confirmAuth = async () => {

    if(!fundingState.confirmPassword) return toastMessage({type:"error", message:"Please enter passoword."})

    setLoading({ confirmPassword: true });
    try {
      const res = await utils.authenticatePassword(fundingState.confirmPassword);
      setLoading({ confirmPassword: false });
      if (res.data.message === 'Success') {
        toastMessage({
          type: 'success',
          message: 'Password confirmed successfully',
        });
        setLoading({ confirmPassword: false });
        setFundingState((s) => ({ ...s, passwordConfirmed: true }));
        setTimeout(async () => {
          setShowConfirmPasswordModal(false);
          if (fundingState.currentProcess === 'fundingBand') {
            setFundingState((s) => ({ ...s, addingFunding: true }));
            try {
              await utils.addFundingBand({amount: fundingState.fundingBand.amount, programme_id: prog_id});
              toastMessage({
                type: 'success',
                message: 'Funding band added successfully',
              });
              setFundingState((s) => ({
                ...s,
                fundingAdded: true,
                addingFunding: false,
                passwordConfirmed: false,
              }));
              setShowAddFundsModal(false);
         
            } catch (e) {
              setFundingState((s) => ({
                ...s,
                fundingAdded: false,
                addingFunding: false,
                passwordConfirmed: false,
              }));
              toastMessage({
                type: 'error',
                message: e?.response?.data.message || 'Error adding new funding band',
              });
            }
          } else if (fundingState.currentProcess === 'fundingAmount') {
            try {
              setFundingState((s) => ({ ...s, addingFunding: true }));
              await utils.addDisbursementFunding({amount: fundingState.amount, funded_at: new Date(fundingState.funded_at).toLocaleDateString('en-US') , programme_id: prog_id });
              toastMessage({
                type: 'success',
                message: 'Funding added successfully',
              });
              setFundingState((s) => ({
                ...s,
                fundingAdded: true,
                addingFunding: false,
                passwordConfirmed: false,
              }));
              setShowAddFundsModal(false);
              getDisbursementsFunding({})
            } catch (error) {
              setLoading({ confirmPassword: false });
              setFundingState((s) => ({ ...s, addingFunding: false }));
              toastMessage({
                type: 'error',
                message: error?.response?.data?.message || 'Error adding new funding data',
              });              
            }
          }
        }, 2000);
      }
    } catch (error) {
      setFundingState((s) => ({
        ...s,
        fundingAdded: false,
        addingFunding: false,
        passwordConfirmed: false,
      }));
      if (error.response && error.response.data) {
        toastMessage({
          type: 'error',
          message: error.response.data.message,
        });
      } else {
        toastMessage({
          type: 'error',
          message: 'Error adding new funding data',
        });
      }
      setLoading({ confirmPassword: false });
    }
  };

  const handlePagination = ({selected}) => {
    getDisbursementsFunding({page: selected + 1})
  }

  const handleShowExportModalData = (table) => {
    setCurrTable(table)
    setShowExporDataModal(true)
  }

  const handleToggle = () => {
    setCurrTable("")
    setShowExporDataModal(!showExporDataModal)
  }

  const handleProceed = async (e) => {
    e.preventDefault()
    let res = {}
    switch (currTable) {
      case "funding":
        res = await exportFundingTableData()
        toast.success(res.data.message)        
        break;

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


  useEffect(() => {
    getDashboardSummary({period, programme_id: prog_id})
    getReportsRetractionFunc({period, programme_id: prog_id});
    getReportsCashedOutFunc({period, programme_id: prog_id})
    getReportsDisbursementsFunc({period, programme_id: prog_id})
    
  }, [dateRange, period, prog_id])

  return (
    <>

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

      {showUploadModal && (
        <UploadBeneficiariesModal prog_id={prog_id} toggleDropdown={() => setShowUploadModal(!showUploadModal)}/>
      )}

      {showUploadBeneficiaryModal && (
        <UploadBeneficiariesAccountModal prog_id={prog_id} toggleDropdown={() => setShowUploadBeneficiaryModal(!showUploadBeneficiaryModal)}/>
      )}      

      {showAddFundsModal && (
        <AddFundsModal
          close={() => setShowAddFundsModal(false)}
          handleAddFunding={(amount, funded_at) => handleAddFunding(amount, funded_at)}
          fundingAdded={fundingState.fundingAdded}
          loading={fundingState.addingFunding}
        />
      )}
      {showAddFundingBandModal && (
        <AddFundingBandModal
          close={() => setShowAddFundingBandModal(false)}
          handleAddFunding={(val) => handleAddFundingBand(val)}
          fundingAdded={fundingState.fundingAdded}
          loading={fundingState.addingFunding}
        />
      )}
      {showConfirmPasswordModal && (
        <GenericModal title="Confirm Authentication">
          {fundingState.passwordConfirmed ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '4rem',
                alignItems: 'center',
              }}
            >
              <CheckmarkCircle />
            </div>
          ) : (
            <>
              <div style={{ padding: '2rem', display: 'flex', justifyItems: 'center' }}>
                <PasswordInput
                  onChange={(e) =>
                    setFundingState((s) => ({
                      ...s,
                      confirmPassword: e.target.value,
                    }))
                  }
                  name="password"
                  placeholder="Password"
                  error={''}
                />
              </div>
              <Approval.Buttons>
                <Button
                  color="white"
                  bg="mediumBue"
                  onClick={confirmAuth}
                  mr="1rem"
                  loading={loading.confirmPassword}
                >
                  Confirm Password
                </Button>
                <Button color="white" bg="red3" onClick={() => setShowConfirmPasswordModal(false)}>
                  Close
                </Button>
              </Approval.Buttons>
            </>
          )}
        </GenericModal>
      )}
      <DashboardLayout state={state}>
        <PageFiltersAndReload
          handleSelectDateRange={handleSelectDateRange}
          handleRefreshPage={handleRefreshPage}
          handleDateChange={handleDateChange}
          refreshing={false}
          showCustom={showCustom}
          dates={dates}
          loading={summaryLoading}
          period={period}
        />
      <FilterContainer>
        <SelectField
          label="Programme"
          onChange={(e) => setProg_id(e.target.value)}
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
          <option value =''>All</option>
          {
            programmes.length && programmes.map(p => <option value={p.id}>{p.name}</option>)
          }
        </SelectField>    

          <Box>
            <Button onClick={() => setShowUploadModal(true)} color="white" bg="green3">
              Upload Beneficiaries
            </Button>
          </Box>
          <Box>
            <Button bg="green3" color="white" onClick={() => window.open('https://akupaydisbursement.nyc3.digitaloceanspaces.com/assets/disbursement_sample_csv.csv', '_blank')}>Download Template</Button>
          </Box>   


          <Box>
            <Button onClick={() => setShowUploadBeneficiaryModal(true)} color="white" bg="green3">
              Upload Beneficiary Account
            </Button>
          </Box>
          <Box>
            <Button bg="green3" color="white" onClick={() => window.open('https://akupaydisbursement.nyc3.digitaloceanspaces.com/assets/account_number_upload_template.csv', '_blank')}>Download Account Template</Button>
          </Box>              
      </FilterContainer> 

        {/* <Enum.Container style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginTop: '5rem' }}> */}
        <CardContainer mt="3rem" mb="5rem">
        <EnumCards
            title="TOTAL FUNDING"
            countFrom={50}
            prefixNairaSymbol
            count={summary?.total_funding || 0}
            loading={summaryLoading}
          />
          <EnumCards
            title="DISBURSED"
            countFrom={150}
            count={summary?.disbursed || 0}
            footer={<span>&#8358; {summary?.disbursed_amount || 0}</span>}
            loading={summaryLoading}
          />
          <EnumCards
            title="RETRACTED"
            countFrom={150}
            count={summary?.retracted || 0}
            color="#FF6F8B"
            loading={summaryLoading}
            footer={<span>&#8358; {summary?.retracted_amount || 0}</span>}            
          />
          <EnumCards
            title="CASHED_OUT"
            countFrom={150}
            count={summary?.cashed_out || 0}
            color="#FF6F8B"
            loading={summaryLoading}
            footer={<span>&#8358; {summary?.cashed_out_amount || 0}</span>}
          />
          <EnumCards
            title="AVAILABLE FUNDS"
            countFrom={150}
            prefixNairaSymbol
            count={summary?.total_funding - summary?.cashed_out_amount || 0}
            color="#FF6F8B"
            loading={summaryLoading}
          />
        </CardContainer>

        {/* </Enum.Container> */}

        <Card>
          <div
            style={{ paddingLeft: '2rem', color: '#222222' }}
          >{`DISBURSEMENT REPORT // [${new Date(Date.now()).toLocaleDateString('en-US')}]`}</div>
          <div>
            <ReportsTable
              tableTitle={<span>Funding</span>}
              columns={allTables.funding}
              loading={reportsFundingLoading}
              data={funding || []}
              handlePagination={handlePagination}
              tableHeaderAction={
                <div style={{ justifyContent: 'space-between', display: 'inline-flex', flex: '1' }}>
                  <Button
                    bg="blue1"
                    color="white"
                    ml="1rem"
                    onClick={() => {
                      setFundingState((s) => ({
                        ...s,
                        fundingAdded: false,
                      }));
                      setShowAddFundsModal(true)
                    }}
                  >
                    Add Funds
                  </Button>

                  <Box width="20rem" display="flex" alignItems="center" justifyContent="space-between">
                    <Button
                      bg="blue1"
                      color="white"
                      ml="1rem"
                      onClick={() => {
                        setFundingState((s) => ({
                          ...s,
                          fundingAdded: false,
                        }))
                        setShowAddFundingBandModal(true)
                      }}
                    >
                      Add Funding Band
                    </Button>
                      <Button onClick={(e) =>{
                            e.preventDefault()
                            handleShowExportModalData("funding")
                      }} bg="black" color="white">
                        EXPORT LIST
                      </Button>                     
                  </Box>
                </div>
              }
              paginationMeta={fundingMeta}
            />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
        </Card>
      </DashboardLayout>


    </>
  );
};

const Dashboard = () => (
  <SidebarProvider>
    <ReportsDashboard />
  </SidebarProvider>
);

export default Dashboard;
