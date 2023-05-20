/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { Button, SearchIcon } from '../../Components/Elements';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { H3 } from '../../Components/GlobalStyles';
import withSelections from 'react-item-select';
import ReloaderBtn from '../../Components/Compositions/Reloader';
import { Box, Flex } from 'rebass';
import SMSBulkOuboxTable from '../../Components/Compositions/Tables/SMSBulkOuboxTable';
import { fetchAllSMSLogsAction, fetchAllIncomingSMSLogsAction, handleDownloadSMSLogsAction, handleSMSExportLogsaAction } from '../../redux/actions/sms.action';
import { toast } from 'react-toastify';
import { SMSAllLogsModal } from '../../Components/Compositions/Modals/SMSAllLogsModal';
import { Flare } from '@emotion-icons/material';
import ExportModal from '../../Components/Compositions/Modals/ExportModal';
import TableSearchInput from '../../Components/Elements/TableSearchInput';

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

const SMSBulkOutbox = (props) => {
  const { state } = useContext(SidebarContext);
  const [openModal, setOpenModal] = useState(false);
  const [dates, setDates] = useState(null);
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    sms_type: 'outgoing'
  })
  const [showExporDataModal, setShowExporDataModal] = useState(false);

  const fetchAllSMSLogs = useCallback(
    (params={}) => dispatch(fetchAllSMSLogsAction(params)),
    [dispatch]
  );

  const fetchAllIncomingSMSLogs = useCallback(
    (params={}) => dispatch(fetchAllIncomingSMSLogsAction(params)),
    [dispatch]
  );

  const handleDownloadSMSLogs = useCallback(
    (params={}) => dispatch(handleDownloadSMSLogsAction(params)),
    [dispatch]
  );

  const handleSMSExportLogs = useCallback(
    (params={}) => dispatch(handleSMSExportLogsaAction(params)),
    [dispatch]
  );    

  const { allSmsLogs, fetchingAllSmsLogs, meta, downloadingSmsLogs, exportingSmsLogs } = useSelector(({ smsMessage }) => ({
    fetchingAllSmsLogs: smsMessage.fetchingAllSmsLogs,
    allSmsLogs: smsMessage.allSmsLogs,
    meta: smsMessage.smsLogsMeta,
    downloadingSmsLogs: smsMessage.downloadingSmsLogs,
    exportingSmsLogs: smsMessage.exportingSmsLogs
  }));

  const handleAllFilters = (e) => {
    e.preventDefault()
    try {
      fetchAllSMSLogs(payload)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server error.')
    }
  }

  const handlePagination = ({selected}) => {
    setPayload({...payload, page: selected + 1})
  }

  const handleRefresh = () => {
    const refreshPayload = {
      page: 1,
      start_date: '',
      end_date: '',
    }
    fetchAllSMSLogs(refreshPayload) 
    setDates(null)
  }

  const handleCloseModal = () => {
    setOpenModal(!openModal)
    setPayload({
      ...payload,
      start_date: null,
      end_date: null,
    })
    // setDates(null)
  }

  const downloadSMSLogs = async(e) =>{
    e.preventDefault()
    try {
      await handleDownloadSMSLogs()
      toast.success("Download was successful")
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server error.')
    }
  }

  const handleProceed = async (e) => {
    try {
      e.preventDefault()
      const res = await handleSMSExportLogs()
      toast.success(res.data.message)   
      setShowExporDataModal(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }    
  }

  const handleToggle = () => {
    setShowExporDataModal(!showExporDataModal)
  }

  useEffect(() => {
    fetchAllSMSLogs(payload)
  }, [payload.sms_type, payload.start_date, payload.end_date, payload.page])

  const columns =  [
    { accessor: 'created_at', Header: 'Date', Cell:({value}) => value ? new Date(value).toDateString() : 'N/A'},
    { accessor: 'sms_content', Header: 'Text' },
    { accessor: 'sms_from', Header: 'From'},
    { accessor: 'sms_to', Header: 'To'},
    { accessor: 'sms_type', Header: 'Type'},
    { accessor: 'delivery_status', Header: 'Status'},
  ]

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const datePayload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setPayload({...payload, ...datePayload})
    }
    setDates(dates);
  };

  return (
    <DashboardLayout state={state}>

      <E.Header>
        <E.FormNameWrapper>
          <H3 style={{ margin: '0', fontWeight: '600' }}>This is a log of your bulk sms outbox</H3>
        </E.FormNameWrapper>
      </E.Header>

      <Flex px="-1" justifyContent="space-between">
        <Flex>
          <Flex>
            <Button
              bg="blue1"
              color="white"
              ml="1rem"
              onClick={() => setOpenModal(true)}
            >
              Filter Messages
            </Button>   

            <Button
              bg="blue1"
              color="white"
              ml="1rem"
              onClick={downloadSMSLogs}
              loading={downloadingSmsLogs}
            >
              Download CSV
            </Button>                            
          </Flex>
          <Box ml="2rem">
            <ReloaderBtn handleClick={handleRefresh} />         
          </Box>          
        </Flex>

        <Flex>
          <Button onClick={(e) =>{
            e.preventDefault()
            setShowExporDataModal(true)
          }} bg="black" color="white">
            EXPORT LIST
          </Button>         
        </Flex>
      </Flex>

      <Flex 
        mt="2rem" 
        justifyContent="flex-end"
        alignItems="center"
      >
        <TableSearchInput
          placeholder="Search by Phone Number"
          whiteBg
          noRadius
          name="s"
          width="300px"
          value={payload.s}
          onChange={(event) => setPayload({...payload, [event.target.name]: event.target.value})}
          handleSearch={() => {
            fetchAllSMSLogs({...payload})
          }}
          cancelSearch={() => {
            setPayload({...payload, s:''})
            fetchAllSMSLogs({...payload, s:''})
          }}
        />
      </Flex>

      <SMSBulkOuboxTable 
        columns={columns}
        data={allSmsLogs}
        loading={fetchingAllSmsLogs}
        meta={meta}
        handlePagination={handlePagination}
      />

      {
        openModal && (
          <SMSAllLogsModal
            handleDateChange={handleDateChange}
            dates={dates}
            handleFilter={handleAllFilters}
            loading={fetchingAllSmsLogs}
            handleCloseModal={handleCloseModal}
            setPayload={setPayload}
            payload={payload}
          />
        )
      }

      {showExporDataModal && (
        <ExportModal 
          toggleModal={handleToggle}
          proceedButtonText="Export"
          handleProceed={handleProceed}
          is_loading={exportingSmsLogs}
          onChange={(e) => false}
          error={""}
          setError={() => false}
        />
        )
      }
    </DashboardLayout>
  );
};



const Page = () => (
  <SidebarProvider>
    <SMSBulkOutbox />
  </SidebarProvider>
);

export default withSelections(withRouter(Page));
