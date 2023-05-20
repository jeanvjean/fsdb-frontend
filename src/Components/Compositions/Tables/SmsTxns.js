import styled from '@emotion/styled';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import withSelections from 'react-item-select';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';
import { FormInput, TableWrapper, Table, Button, Text, CardHeader } from '../../Elements';
import { toastMessage } from '../../Elements';

import {
  processSMSTransactionsAction,
  getSMSTransactionsRepAction,
  resolveSMSTransactionsAction,
} from '../../../redux/actions/transactions.actions';
import { utils } from '../../../api/utils';
import SelectField from '../../Elements/SelectField';
import { SmsActionModal } from '../Modals/SmsActionModal';
import {
  EntriesButton,
  EntriesCard,
  EntriesFilterBy,
  EntriesSelect,
  EntriesTrashIcon,
} from '../../../pages/Admin/Approvals';
import SucessModal from '../Modals/SuccessModal';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import ExportModal from '../Modals/ExportModal';
import Pagination, { PaginationBTN } from '../Pagination';
import EmptyState from '../EmptyState';

export const tableHeadStyles = {
  minWidth: '50px',
};

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: 1rem;
`;

const TxnActions = ({ value, resolveHandler, resolving, processSMSHandler }) => {
  const [showTranfer, setShowTranfer] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [retry, setRetry] = useState(false);
  if (value === 'pending' || value === 'not_resolved') {
    return (
      <Flex>
        <Flex direction="column">
          <Button
            onClick={() => {
              resolveHandler();
              setShowTranfer(true);
            }}
            color={resolved ? 'black' : 'white'}
            bg={resolved ? 'grey2' : 'mediumBue'}
            disabled={resolved}
            loading={resolving}
          >
            {value === 'pending' ? 'Resolve' : 'Retry Resolve'}
          </Button>
        </Flex>
      </Flex>
    );
  } else if (value === 'resolved') {
    return (
      <>
        <Flex direction="column">
          <Button bg="bodyBgColor" color="black" disabled>
            Resolved
          </Button>
          <Button
            onClick={() => {
              processSMSHandler();
            }}
            color="white"
            bg="green3"
          >
            Process &#62;
          </Button>
        </Flex>
      </>
    );
  } else if (value === 'process_for_approval') {
    return (
      <Flex direction="column">
        <Button bg="bodyBgColor" color="black" disabled>
          Resolved
        </Button>
        <Button disabled>Processed</Button>
      </Flex>
    );
  } else if (value === 'approved') {
    return (
      <Flex direction="column">
        <Button bg="bodyBgColor" color="black" disabled>
          Resolved
        </Button>
        <Button bg="bodyBgColor" color="black" disabled>
          Processed
        </Button>
      </Flex>
    );
  }
};

const SmsTxns = (props) => {
  const [state, setState] = useState({ selectedTrxns: [] });
  const [showProcessSmsModal, setShowProcessSmsModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showSendSMSModal, setShowSendSMSModal] = useState(false);
  const [success, setSuccess] = useState({
    show: false,
    payload: {
      totalTrans: 0,
      approvedTrans: 0,
      rejectedTrans: 0,
    },
  });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState({ type: '', error: '' });
  const {
    areAllIndeterminate,
    areAllSelected,
    handleSelect,
    handleSelectAll,
    isItemSelected,
    selectedCount,
    selections,
    data = [],
    period,
    meta = {
      last_page: 1,
      limit: 20,
      next_page: 0,
      page: 1,
      previous_page: 0,
    },
  } = props;

  const { resolving, loading } = useSelector(({ smsTransactions: { resolving, loading } }) => ({
    resolving,
    loading,
  }));

  const dispatch = useDispatch();

  const processSMSTransactions = useCallback(
    (payload) => dispatch(processSMSTransactionsAction(payload)),
    [dispatch]
  );
  const resolveSMSTransactions = useCallback(
    (payload) => dispatch(resolveSMSTransactionsAction(payload)),
    [dispatch]
  );
  const fetchTransactions = useCallback(
    (period, s, filter, page) => dispatch(getSMSTransactionsRepAction(period, s, filter, page)),
    [dispatch]
  );

  const columns = useMemo(
    () => [
      { accessor: 'message_content', Header: 'SMS PROJECT' },
      { accessor: 'phone_number', Header: 'PHONE' },
      // { accessor: 'error', Header: 'ERROR', Cell: ({ value }) => <Text color="red">{value}</Text> },
      { accessor: 'bank_name', Header: 'REGEX BANK NAME' },
      { accessor: 'account_number', Header: 'REGEX ACCT#' },
      {
        accessor: 'bank_list',
        Header: 'BANK LIST',
        Cell: ({ value, row }) => {
          const handleChange = (e) => {
            row.original.new_bank_name = e.target.value;
          };
          return (
            <SelectField
              name="bank_name"
              onChange={handleChange}
              defaultValue={row?.original?.last_history?.bank_name || ''}
              disabled={!['pending', 'not_resolved'].includes(row.original.status)}
            >
              <option value="">Select Bank</option>
              <option value="Access">Access Bank</option>
              <option value="Citibank">Citibank Nigeria</option>
              <option value="Diamond">Diamond Bank</option>
              <option value="Ecobank">Eco Bank</option>
              <option value="FBN">First Bank</option>
              <option value="FCMB">First City Monument Bank</option>
              <option value="Fidelity">Fidelity Bank</option>
              <option value="GTBank">GT Bank</option>
              <option value="Heritage">Heritage Bank</option>
              <option value="Keystone">Keystone Bank</option>
              <option value="MainStreet">MainStreet Bank</option>
              <option value="Polaris">Skye Bank</option>
              <option value="Stanbic">Stanbic IBTC</option>
              <option value="Standard">Standard Chartered Bank</option>
              <option value="Sterling">Sterling Bank</option>
              <option value="Union">Union Bank</option>
              <option value="UBA">UBA</option>
              <option value="Unity">Unity Bank</option>
              <option value="Wema">Wema Bank</option>
              <option value="Zenith">Zenith Bank</option>
            </SelectField>
          );
        },
      },
      {
        accessor: 'new_account_number',
        Header: 'NEW ACCT NUMBER',
        Cell: ({ row }) => {
          const handleChange = (e) => {
            row.original.new_account_number = e.target.value;
          };

          return (
            <FormInput
              defaultValue={row?.original?.last_history?.account_number || ''}
              placeholder="Enter account #"
              disabled={!['pending', 'not_resolved'].includes(row.original.status)}
              onChange={handleChange}
            />
          );
        },
      },
      { accessor: 'created_at', Header: 'TIMESTAMP' },
      { accessor: 'status', Header: 'STATUS' },
      {
        accessor: 'action',
        Header: 'ACTION',
        Cell: ({ row, resolving }) => {
          return (
            <>
              <TxnActions
                resolveHandler={async () => await resolveHandler(row.original)}
                processSMSHandler={() => processTransactionHandler(row.original.id)}
                value={row.original.status || 'pending'}
              />
            </>
          );
        },
      },
    ],
    []
  );

  const resolveHandler = async (trxn) => {
    try {
      const trxnClone = JSON.parse(JSON.stringify(trxn));
      if (!trxnClone.new_account_number) {
        trxnClone.new_account_number =
          trxnClone?.last_history?.account_number || trxnClone.account_number;
      }
      if (!trxnClone.new_bank_name) {
        trxnClone.new_bank_name = trxnClone?.last_history?.bank_name || trxnClone.bank_name;
      }
      delete trxnClone.account_name;
      delete trxnClone.account_resolved_by;
      delete trxnClone?.last_history;

      const res = await resolveSMSTransactions({ payload: [trxnClone] });
      if (res.data.data[0].success) {
        return toastMessage({
          type: 'success',
          message: res.data.data[0].message || 'Success',
        });
      }
      return toastMessage({
        type: 'error',
        message: res.data.data[0].message || 'Error',
      });
    } catch (error) {
      console.log(error);
      toastMessage({ type: 'error', message: error.response?.data?.message });
    }
  };

  const processTransactionHandler = async (id) => {
    try {
      const res = await processSMSTransactions({ ids: [id] });
      toastMessage({
        type: 'success',
        message: 'SMS transactions sent for approving successfully',
      });
    } catch (error) {
      toastMessage({ type: 'error', message: error.response?.data?.message });
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({
    columns,
    data,
  });

  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  };

  const handleSelectTrxn = (trxn) => {
    handleSelect(trxn.id);
    if (containsObject(trxn, state.selectedTrxns)) {
      setState((prev) => ({
        ...prev,
        selectedTrxns: prev.selectedTrxns.filter((s) => s.id !== trxn.id),
      }));
    } else {
      if (!trxn.new_account_number) {
        trxn.new_account_number = trxn?.last_history?.account_number || trxn.account_number;
      }
      if (!trxn.new_bank_name) {
        trxn.new_bank_name = trxn?.last_history?.bank_name || trxn.bank_name;
      }
      setState((prev) => ({
        ...prev,
        selectedTrxns: [...prev.selectedTrxns, trxn],
      }));
    }
  };

  const handleSelectAllTrxns = (trxns) => {
    handleSelectAll(trxns);
    if (state.selectedTrxns.length) {
      setState({ selectedTrxns: [] });
    } else {
      setState({ selectedTrxns: trxns });
    }
  };

  const handleProcessSms = async () => {
    try {
      setShowProcessSmsModal(false);
      const res = await processSMSTransactions({ ids: Object.keys(selections) });
      const failedTransactions = res.data.data.filter((trans) => !trans.success);
      const successfulTransactions = res.data.data.filter((trans) => trans.success);

      setSuccess({
        show: true,
        payload: {
          totalTrans: `${state.selectedTrxns.length} Transactions For Processing`,
          approvedTrans: `${successfulTransactions.length} Processed`,
          rejectedTrans: `${failedTransactions.length} Not processed`,
        },
      });
    } catch (error) {
      toastMessage({ type: 'error', message: error.response?.data?.message });
    }
  };

  const handleResolveSms = async () => {
    let payload = state.selectedTrxns.map((item) => ({ ...item }));
    payload = payload.map((item) => {
      delete item.account_name;
      delete item.last_history;
      delete item.account_resolved_by;
      return item;
    });

    try {
      const res = await resolveSMSTransactions({
        payload,
      });
      const failedTransactions = res.data.data.filter((trans) => !trans.success);
      const successfulTransactions = res.data.data.filter((trans) => trans.success);
      setShowResolveModal(false);
      setSuccess({
        show: true,
        payload: {
          totalTrans: `${state.selectedTrxns.length} Transactions For Resolving`,
          approvedTrans: `${successfulTransactions.length} Resolved`,
          rejectedTrans: `${failedTransactions.length} Not Resolved`,
        },
      });
    } catch (error) {
      toastMessage({ type: 'error', message: error.response?.data?.message });
    }
  };

  const handleTriggerSms = async () => {
    try {
      setShowSendSMSModal(false);
      const res = await utils.triggerSMSResendForTransactions({
        transaction_id: Object.keys(selections),
      });
      handleSelectAllTrxns([]);
      toastMessage({
        type: 'success',
        message: res.data.message || 'Success',
      });
    } catch (error) {
      toastMessage({ type: 'error', message: error.response?.data?.message });
    }
  };

  const handleExport = (e) => {
    e.preventDefault();
    if (exportType.type) {
    } else {
      setExportType({ error: 'Select a file format to export' });
    }
  };

  const isSelectionsMatchingStatus = (...status) => {
    const ids = Object.keys(selections);
    if (ids.length) {
      const selectionsNotMatchingStatus = [];
      ids.forEach((item) => {
        const tx = data.find((i) => i.id === item).status;
        if ([tx].includes(...status)) {
          selectionsNotMatchingStatus.push(true);
        }
      });
      return selectionsNotMatchingStatus.length ? true : false;
    }
    return true;
  };

  return (
    <>
      {showExportModal && (
        <ExportModal
          toggleModal={() => setShowExportModal(!showExportModal)}
          proceedButtonText="Export"
          handleProceed={handleExport}
          is_loading={false}
          onChange={(e) => setExportType({ ...exportType, type: e.target.value })}
          error={exportType.error}
          setError={setExportType}
        />
      )}
      {showProcessSmsModal && (
        <SmsActionModal
          heading="PROCESS SMS TRANSACTIONS"
          text={`You are about to process ${selectedCount} SMS transactions`}
          handleProceed={handleProcessSms}
          toggleModal={() => setShowProcessSmsModal(!showProcessSmsModal)}
        />
      )}
      {showResolveModal && (
        <SmsActionModal
          heading="RESOLVE SMS TRANSACTIONS"
          text={`You are about to resolve ${selectedCount} SMS transactions`}
          handleProceed={handleResolveSms}
          toggleModal={() => setShowResolveModal(!showResolveModal)}
          loading={resolving}
        />
      )}
      {showSendSMSModal && (
        <SmsActionModal
          heading=" SMS TRANSACTIONS"
          text={`You are about to trigger an resend SMS notification to the phone ${
            selectedCount > 1 ? 'numbers' : 'number'
          } associated with ${
            selectedCount > 1 ? `these ${selectedCount} transactions` : 'this trasanction'
          }`}
          handleProceed={handleTriggerSms}
          toggleModal={() => setShowResolveModal(!showResolveModal)}
        />
      )}
      {success.show && (
        <SucessModal
          heading="PROCESS SMS TRANSACTIONS"
          payload={success.payload}
          close={() => setSuccess((s) => ({ ...s, show: false }))}
        />
      )}
      <EntriesCard>
        <CardHeader
          style={{
            borderBottom: '1px solid #D3D3D3',
            padding: '1rem 1.6rem',
          }}
        >
          <div>
            <EntriesButton
              onClick={() => {
                if (state.selectedTrxns.length) {
                  setShowProcessSmsModal(true);
                }
              }}
              disabled={isSelectionsMatchingStatus('resolved')}
            >
              PROCESS
            </EntriesButton>
            <EntriesButton
              disabled={!Object.keys(selections).length}
              onClick={() => {
                setShowSendSMSModal(true);
              }}
            >
              SEND SMS
            </EntriesButton>
            <EntriesButton
              disabled={isSelectionsMatchingStatus('pending', 'not_resolved')}
              onClick={() => {
                if (state.selectedTrxns.length) {
                  setShowResolveModal(true);
                }
              }}
            >
              RESOLVE SMS
            </EntriesButton>
          </div>
          <Flex>
            <EntriesFilterBy>
              Filter By
              <EntriesSelect
                name="filter"
                onChange={(event) => fetchTransactions(period || '', '', event.target.value)}
                noRadius
              >
                <option defaultChecked value="">No Filters</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="process_for_approval">Processed</option>
   
                {/* <option value="not_resolved">Not Resolved</option> */}
              </EntriesSelect>
            </EntriesFilterBy>
          </Flex>
        </CardHeader>
        <TableWrapper>
          <Table {...getTableProps()}>
            <Table.Head>
              {headerGroups.map((headerGroup) => (
                <Table.Tr {...headerGroup.getHeaderGroupProps()} empty>
                  <Table.Th>
                    {/* <div > */}
                      <Table.Checkbox
                        style={{marginTop: '5rem'}}
                        name="thcheckbox"
                        type="checkbox"
                        checked={areAllSelected(data)}
                        indeterminate={areAllIndeterminate(data)}
                        onChange={() => handleSelectAllTrxns(data)}
                      />
                    {/* </div> */}
                  </Table.Th>
                  {headerGroup?.headers.map((col) => {
                    return (
                      <Table.Th
                        align="center"
                        {...col.getHeaderProps()}
                        key={col.id}
                        data-tip
                        data-for={col.id}
                        data-columnname={col.id}
                        style={{ minWidth: '150px' }}
                      >
                        <Table.Flex>{col.render('Header')}</Table.Flex>
                      </Table.Th>
                    );
                  })}
                </Table.Tr>
              ))}
            </Table.Head>
            <Table.Body {...getTableBodyProps()}>
              {loading && (
                <Table.Tr>
                  <Table.Td align="center" colSpan="30">
                    <SpinnerContainer>
                      <Spinner color="mediumBue" />
                    </SpinnerContainer>
                  </Table.Td>
                </Table.Tr>
              )}

              {(!data.length && !loading && (
                <Table.Tr empty style={{ height: '500px' }}>
                  <Table.Td align="center" colSpan="30">
                    <EmptyState text="No transactions to display yet" />
                  </Table.Td>
                </Table.Tr>
              )) ||
                null}

              {rows?.map((row, i) => {
                prepareRow(row);
                return (
                  <Table.Tr {...row.getRowProps()}>
                    <Table.Td className="sticky" style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                      <Table.Checkbox
                        name="trcheckbox"
                        type="checkbox"
                        checked={isItemSelected(row.original.id)}
                        onChange={() => handleSelectTrxn(row.original)}
                      />
                    </Table.Td>
                    {row.cells.map((cell) => (
                      <Table.Td {...cell.getCellProps()}>
                        {cell.render('Cell', { resolving })}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                );
              })}
            </Table.Body>
          </Table>
          <Pagination
            onPageChange={(page) => fetchTransactions('', '', '', page)}
            pages={meta.last_page || 1}
            page={meta.page || 1}
            previousText="previous"
            nextText="next"
            PageButtonComponent={PaginationBTN}
          />
        </TableWrapper>
      </EntriesCard>
    </>
  );
};

export default withSelections(SmsTxns);
