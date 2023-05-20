import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Box } from 'rebass'
import { utils } from '../../api/utils'
import ExportModal from '../../Components/Compositions/Modals/ExportModal'
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload'
import ResponseLogsTable from '../../Components/Compositions/Tables/ResponseLogs'
import { Button, CardHeader } from '../../Components/Elements'
import TableSearchInput from '../../Components/Elements/TableSearchInput'
import { H3 } from '../../Components/GlobalStyles'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { getDateDifference } from '../../Components/utils'
import { SidebarContext } from '../../context/SidebarContext'
import { handleExportResponseLogsAction } from '../../redux/actions/sms.action'
import { EntriesCard } from './Approvals'
import { E } from './SmsTransaction'

const ErrorResponsePage = () => {

  const {state} = useContext(SidebarContext)

  const dispatch = useDispatch()

  const [period, setPeriod] = useState(30);
  const [showCustom, setShowCustom] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [meta, setMeta] = useState({});  
  const [dates, setDates] = useState(null);
  const [responseLogsData, setResponseLogsData] = useState([])
  const [showExporDataModal, setShowExporDataModal] = useState(false);

  const { exportingResponseLogs } = useSelector(({ smsMessage }) => ({
    exportingResponseLogs: smsMessage.exportingResponseLogs,
  }));      

  const handleExportResponseLogs = useCallback(() => dispatch(handleExportResponseLogsAction()), [dispatch])

  const [payload, setPayload] = useState({s: ''})

  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setPayload({...payload, period: e.target.value})
    }
  };

  const handleRefreshPage= () => {
    setPayload({})
    fetchResponseLogs()
  }

  const handleToggle = () => {
    setShowExporDataModal(!showExporDataModal)
  }  

  const handleProceed = async (e) => {
    try {
      e.preventDefault()
      const res = await handleExportResponseLogs()
      toast.success(res?.data?.message)   
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }    
  }

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      setPayload({
        ...payload, 
        period: getDateDifference(
          new Date(start_date).toLocaleDateString('en-US'), 
          new Date(end_date).toLocaleDateString('en-US')
        )
      })
    }else{
      setPayload({...payload, period:''})
    }
    setDates(dates);
  };

  const fetchResponseLogs = async (data) => {
    try {
      setResponseLogsData([])
      setLoadingData(true)
      const res = await utils.getAllResponseLogs(data)
      setResponseLogsData(res.data)
      setMeta(res.meta)

      setLoadingData(false)
    } catch (error) {
      setLoadingData(false)
      toast.error(error.message)
    }
  }

  const handleSearch = (e) => {
    fetchResponseLogs(payload)
  }

  useEffect(() => {
    fetchResponseLogs(payload)
  }, [payload])

  const handlePagination = ({selected}) => {
    setPayload({...period, page: selected+1})
  }  

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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Response Logs</H3>
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
            cancelSearch={() => {
              handleSearch()
              setPayload({...payload, s:''})
            }}
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
            <Button onClick={() => setShowExporDataModal(!showExporDataModal)} bg="black" color="white">
              EXPORT LIST
            </Button>
          </CardHeader>
          <ResponseLogsTable 
            data={responseLogsData}
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
          is_loading={exportingResponseLogs}
          onChange={(e) => false}
          error={""}
          setError={() => false}
        />
        )
      }          
    </Box>
  )
}

export default ErrorResponsePage
