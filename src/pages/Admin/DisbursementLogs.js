/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';

import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { Card, TrashIcon, Button } from '../../Components/Elements';

import styled from '@emotion/styled';
import { H3 } from '../../Components/GlobalStyles';
import { Search, E } from './SmsTransaction';
import PageFiltersAndReload from '../../Components/Compositions/PageFiltersAndReload';
import SelectField from '../../Components/Elements/SelectField';
import DisbursementLogsTable from '../../Components/Compositions/Tables/DisbursementLogsTable';
import UploadBeneficiariesModal from '../../Components/Compositions/Modals/UploadBeneficiariesModal';

import TableSearchInput from '../../Components/Elements/TableSearchInput';
import {
  getDisbursementsBeneficiariesAction,
  getDisbursementsSMS,
  getDisbursementsUSSDSessions,
} from '../../redux/actions/disbursements.actions';
import { Box } from 'rebass';
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

const FilterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  width: 30%;
  margin: 0 0 3rem 0;
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

const DisbursementLogs = (props) => {
  const { state } = useContext(SidebarContext);
  const [showCustom, setShowCustom] = useState(false);
  const [tableView, setTableView] = useState('beneficiaries');
  const [dates, setDates] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [beneficiaryPayload, setBeneficiaryPayload] = useState({status: 'paid'})

  const dispatch = useDispatch();

  const fetchDisbursementsBeneficiaries = useCallback(
    (params) =>
      dispatch(getDisbursementsBeneficiariesAction(params)),
    [dispatch]
  );

  const fetchDisbursementsUSSDSessions = useCallback(
    (params) => dispatch(getDisbursementsUSSDSessions(params)),
    [dispatch]
  );

  const fetchDisbursementsSMS = useCallback(
    (params) => dispatch(getDisbursementsBeneficiariesAction(params)),
    [dispatch]
  );

  const { disbursementLogs, loadingDisbursementLogs, disbursementsLogsMeta } = useSelector(
    ({ disbursement }) => ({
      disbursementLogs: disbursement.disbursementsLogs,
      loadingDisbursementLogs: disbursement.loadingAllDisbursements,
      disbursementsLogsMeta: disbursement.disbursementsLogsMeta,
    })
  );

  useEffect(() => {
    if (tableView === 'beneficiaries') return fetchDisbursementsBeneficiaries(beneficiaryPayload);
    if (tableView === 'ussd') return fetchDisbursementsUSSDSessions(beneficiaryPayload);
    if (tableView === 'sms') return fetchDisbursementsSMS(beneficiaryPayload);  
  }, [tableView, beneficiaryPayload.period, beneficiaryPayload.bands]);

  const handleSelectDateRange = async (e) => {
    e.persist();
    if (e.target.value === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setBeneficiaryPayload({...beneficiaryPayload, period: e.target.value})
    }
  };

  const handleRefreshPage = async () => {
    setDates([]);    
    document.getElementById('date-range').selectedIndex = 0;
    setBeneficiaryPayload({...beneficiaryPayload, s:"",  period:'', bands:''})
    fetchDisbursementsBeneficiaries({...beneficiaryPayload, s:"",  period:'', bands:''})
    // fetchDisbursementsUSSDSessions('', '', '')
    // fetchDisbursementsSMS('', '', '')
  };

  const handlePagination = async ({selected}) => {
    setBeneficiaryPayload({...beneficiaryPayload, page: selected + 1})
    fetchDisbursementsBeneficiaries({...beneficiaryPayload, page: selected + 1})
  };

  const handleDateChange = async (dates) => {
    if (dates?.length) {
      const [start_date, end_date] = dates;
      const payload = {
        start_date: new Date(start_date).toLocaleDateString('en-US'),
        end_date: new Date(end_date).toLocaleDateString('en-US'),
      };
      setBeneficiaryPayload({...beneficiaryPayload, period: getDateDifference(payload.start_date, payload.end_date)})
    }
    setDates(dates);
  };

  const goBackToForms = () => {
    props.history.goBack();
  };

  return (
    <>
      {showUploadModal && (
        <UploadBeneficiariesModal toggleDropdown={() => setShowUploadModal(!showUploadModal)} />
      )}

      <DashboardLayout state={state} disableDashoardRoute>
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
            <H3 style={{ margin: '0', fontWeight: '600' }}>Disbursements Logs</H3>
          </E.FormNameWrapper>
          <TableSearchInput
            placeholder="Search by bank name, acc number"
            whiteBg
            noRadius
            name="s"
            width="300px"
            value={beneficiaryPayload.s}
            onChange={(e) => setBeneficiaryPayload({...beneficiaryPayload, [e.target.name]: e.target.value})}
            handleSearch={() => {
              fetchDisbursementsBeneficiaries({...beneficiaryPayload});
            }}
            cancelSearch={() => {
              setBeneficiaryPayload({...beneficiaryPayload, s:''})
              fetchDisbursementsBeneficiaries({...beneficiaryPayload, s:''})
            }}
          />
        </E.Header>
        <FilterContainer>
          <SelectField
            noRadius
            whiteBg
            style={{ minWidth: '268px' }}
            onChange={(e) => setTableView(e.target.value)}
            label="Select Log to view"
          >
            <option value="beneficiaries" defaultChecked>
              Beneficiaries
            </option>
            <option value="ussd" disabled>USSD (Feature Not Currently Available)</option>
            <option value="sms" disabled>SMS (Feature Not Currently Available)</option>
          </SelectField>
          {/* <div>
            <Button onClick={() => setShowUploadModal(true)} color="white" bg="green3">
              Upload Beneficiaires
            </Button>
          </div>
          <Box>
            <Button bg="green3" color="white" onClick={() => window.open('https://akupaydisbursement.nyc3.digitaloceanspaces.com/assets/disbursement_sample_csv.csv', '_blank')}>Download Template</Button>
          </Box> */}
        </FilterContainer>

        <EntriesCard>
          <DisbursementLogsTable
            tableToView={tableView}
            data={{ [tableView]: disbursementLogs || [] }}
            loading={loadingDisbursementLogs}
            meta={{ [tableView]: disbursementsLogsMeta }}
            fetchData={{ beneficiaries: fetchDisbursementsBeneficiaries }}
            payload={beneficiaryPayload}
            setPayload={setBeneficiaryPayload}
            handlePagination={handlePagination}
          />
        </EntriesCard>
      </DashboardLayout>
    </>
  );
};

const Page = () => (
  <SidebarProvider>
    <DisbursementLogs />
  </SidebarProvider>
);

export default withRouter(Page);
