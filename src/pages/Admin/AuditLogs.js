/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import {
  PrinterIcon,
  ExportIcon,
  CardHeader,
  ReloadIcon,
  Button,
  toastMessage,
} from '../../Components/Elements';
import { H3 } from '../../Components/GlobalStyles';
import { Search, E } from './SmsTransaction';
import {
  EntriesButton,
  EntriesCard,
  EntriesFilterBy,
  EntriesSelect,
  EntriesTrashIcon,
} from './Approvals';
import AuditLogsTable from '../../Components/Compositions/Tables/AuditLogsTable';
import TableSearchInput from '../../Components/Elements/TableSearchInput';
import ExportModal from '../../Components/Compositions/Modals/ExportModal';
import { utils } from '../../api/utils';
import { useDispatch, useSelector } from 'react-redux';
import { exportAuditLogsAction } from '../../redux/actions/audit-logs.actions';
import { toast } from 'react-toastify';
import { Box } from 'rebass';

const mapStateToProps = ({auditLogs}) => ({
  exportingAuditLogs: auditLogs.exportingAuditLogs,
})

const AuditLogs = (props) => {
  const { state } = useContext(SidebarContext);
  const [showExportModal, setshowExportModal] = useState(false);
  const [exportType, setExportType] = useState({ type: '', error: '' });
  const [period, setPeriod] = useState(30);
  const [currPage, setCurrPage] = useState(1);
  const [showCustom, setShowCustom] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [meta, setMeta] = useState({
    last_page: 1,
    limit: 20,
    next_page: 1,
    page: 1,
    previous_page: 1,
  });
  const [dates, setDates] = useState(null);
  const [auditLogData, setAuditLogData] = useState([]);

  const dispatch = useDispatch()

  const exportAuditLogs = useCallback((payload={}) => dispatch(exportAuditLogsAction(payload)), [dispatch])

  const {exportingAuditLogs} = useSelector(mapStateToProps)

  const fetchAuditLogs = async (period, s="", page=currPage) => {
    try {
      setAuditLogData([])
      setLoadingData(true);
      const data = await utils.getAllAuditLogs(period, s, page);
      setAuditLogData(data.data.data);
      setMeta(data.data.meta);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuditLogs(period);
    let parent = document.querySelector('.sticky').parentElement;

    while (parent) {
      const hasOverflow = getComputedStyle(parent).overflow;
      // if (hasOverflow !== 'visible') {
      //   console.log(hasOverflow, parent);
      // }
      parent = parent.parentElement;
    }
  }, [period]);

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
    setDates([]);
    document.getElementById('date-range').selectedIndex = 0;
    setPeriod(30)
    setCurrPage(1)
    setSearchValue('')
    fetchAuditLogs(30, '', 1)
  };

  const handlePagination = ({selected}) => {
    fetchAuditLogs(period, searchValue, selected+1)
  }

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const payload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setPeriod(payload.start_date, payload.end_date)
    }else{
      setPeriod('')
    }
    setDates(dates);
  };

  const goBackToForms = () => {
    props.history.goBack();
  };

  const handleExport = async (e) => {
    e.preventDefault();
    try {
      await exportAuditLogs()
      toast.success('Successfully exported data')
    } catch (error) {
      toast.error(error?.response?.data.message || 'Internal Server Error')
    }
  };

  useEffect(() => {
    fetchAuditLogs(period, searchValue, currPage)
  }, [currPage])

  return (
    <>
      {showExportModal && (
        <ExportModal
          toggleModal={() => setshowExportModal(!showExportModal)}
          proceedButtonText="Export"
          handleProceed={handleExport}
          is_loading={exportingAuditLogs}
          onChange={(e) => setExportType({ ...exportType, type: e.target.value })}
          error={exportType.error}
          setError={setExportType}

        />
      )}
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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Audit Logs</H3>
          </E.FormNameWrapper>
          <TableSearchInput
            placeholder="Enter User, Type or Activity"
            whiteBg
            noRadius
            name="s"
            width="300px"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            handleSearch={() => {
              fetchAuditLogs(period, searchValue, currPage);
            }}
            cancelSearch={() =>{
              setSearchValue('')
              fetchAuditLogs(period, '', currPage);
            } }
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
            {/* <EntriesFilterBy>
              Filter By
              <EntriesSelect name="period" onChange={(e) => setPeriod(e.target.value)} noRadius>
                <option defaultChecked>All Entries</option>
                <option value="1">Today's Entries</option>
                <option value="2">Yesterday's Entries</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </EntriesSelect>
            </EntriesFilterBy> */}
            <Button loading={exportingAuditLogs} onClick={() => setshowExportModal(true)} bg="black" color="white">
              EXPORT LIST
            </Button>
          </CardHeader>
          <AuditLogsTable
            data={auditLogData}
            meta={meta}
            getData={fetchAuditLogs}
            loading={loadingData}
            period={period}
            s={searchValue}
            currPage={currPage}
            handlePagination={handlePagination}

          />
        </EntriesCard>
      </DashboardLayout>
    </>
  );
};

const Page = () => (
  <SidebarProvider>
    <AuditLogs />
  </SidebarProvider>
);

export default withRouter(Page);
