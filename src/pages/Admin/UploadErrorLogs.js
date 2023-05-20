import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Box } from 'rebass'
import { utils } from '../../api/utils'
import ExportModal from '../../Components/Compositions/Modals/ExportModal'
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload'
import UploadErrorLogsTable from '../../Components/Compositions/Tables/UploadErrorLogs'
// import UploadErrorLogsTable from '../../Components/Compositions/Tables/ResponseLogs'
import { Button, CardHeader } from '../../Components/Elements'
import TableSearchInput from '../../Components/Elements/TableSearchInput'
import { H3 } from '../../Components/GlobalStyles'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { SidebarContext } from '../../context/SidebarContext'
import { EntriesCard } from './Approvals'
import { E } from './SmsTransaction'
import {
  exportUploadErrorLogsAction,
} from '../../redux/actions/disbursements.actions';

const UploadErrorLogs = () => {

  const {state} = useContext(SidebarContext)

  const [showCustom, setShowCustom] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [meta, setMeta] = useState({});  
  const [dates, setDates] = useState(null);
  const [uploadErrorLogsData, setUploadErrorLogs] = useState([])

  const dispatch = useDispatch();

  const [payload, setPayload] = useState({s: '', period: 30})
  const [showExporDataModal, setShowExporDataModal] = useState(false);

  const { exportingRetractedData } = useSelector(({ disbursement }) => ({
    exportingRetractedData: disbursement.exportingRetractedData,
  }));  

  const exportUploadErrorLogs = useCallback(
    (params={}) => dispatch(exportUploadErrorLogsAction(params)),
    [dispatch]
  );    

  const handleRefreshPage= () => {
    setPayload({})
    fetchUploadErrorLogs()
  }

  const handleProceed = async (e) => {
    try {
      e.preventDefault()
      const res = await exportUploadErrorLogs()
      toast.success(res.data.message)   
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }    
  }


  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setPayload({...payload, period: e.target.value})
    }
  };

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const datePayload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setPayload({...payload, ...datePayload})
    }
    setDates(dates)
  };

  const fetchUploadErrorLogs = async () => {
    try {
      setUploadErrorLogs([])
      setLoadingData(true)
      const res = await utils.getAllUploadErrorLogs(payload)
      setUploadErrorLogs(res.data)
      setMeta(res.meta)
      setLoadingData(false)
    } catch (error) {
      setLoadingData(false)
      toast.error(error.message)
    }
  }

  const handleSearch = (e) => {
    fetchUploadErrorLogs(payload)
  }

  const handlePagination = ({selected}) => {
    setPayload({...payload, page: selected + 1})
  }  

  const handleToggle = () => {
    setShowExporDataModal(!showExporDataModal)
  }  

  useEffect(() => {
    fetchUploadErrorLogs()
  }, [payload.period, payload.start_date, payload.end_date, payload.page])


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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Upload Error Logs</H3>
          </E.FormNameWrapper>
          <TableSearchInput
            placeholder="Enter Message or Phone Number"
            whiteBg
            noRadius
            name="s"
            width="300px"
            value={payload.s}
            onChange={(e) => setPayload({...payload, [e.target.name]: e.target.value})}
            handleSearch={() => handleSearch()}
            cancelSearch={() => setPayload({...payload, s:''})}
          />
        </E.Header>

        <EntriesCard>
          <CardHeader
            className="sticky"
            style={{
              borderBottom: '1px solid #D3D3D3',
              padding: '1rem 1.6rem',
            }}
          >
            <Box></Box>    
            <Button onClick={() => setShowExporDataModal(true)} bg="black" color="white">
              EXPORT LIST
            </Button>
          </CardHeader>
          <UploadErrorLogsTable
            data={uploadErrorLogsData}
            meta={meta}
            loading={loadingData}
            handlePagination={handlePagination}        
          />
        </EntriesCard>        

      </DashboardLayout>

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
    </Box>
  )
}

export default UploadErrorLogs
