import React, { useState, useMemo, useCallback, useEffect } from 'react';
import withSelections from 'react-item-select';
import { useTable } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import {
  CaretIcon,
  FormInput,
  TableWrapper,
  Table,
  Button,
  Text,
  toastMessage,
  CardHeader,
} from '../../Elements';
import { EntriesButton, EntriesFilterBy, EntriesSelect } from '../../../pages/Admin/Approvals';
import SelectField from '../../Elements/SelectField';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import ApprovalModal from '../Modals/ApprovalModal';
import ApprovalSucess from '../Modals/SuccessModal';
import Pagination, { PaginationBTN } from '../Pagination';

import {
  approveSMSTransactionsAction,
  getSMSTransactionsAdminAction,
} from '../../../redux/actions/transactions.actions';
import EmptyState from '../EmptyState';

export const tableHeadStyles = {
  minWidth: '50px',
};

const renderActionField = (row, setApprovals) => {
  if (row.status === 'process_for_approval') {
    return (
      <>
        <Button onClick={() => setApprovals(row.id)} color="white" bg="mediumBue" mb="10px">
          Approve
        </Button>
      </>
    );
  } else if (row.status === 'approved') {
    return (
      <Button onClick={() => true} color="white" bg="green2" mb="10px" disabled>
        Approved
      </Button>
    );
  } else if (row.status === 'pending') {
    return <Button disabled>Not Resolved</Button>;
  } else if (row.status === 'resolved') {
    return <Button disabled>Not Processed</Button>;
  } else {
    return 'Not Available';
  }
};

const ApprovalsTable = (props) => {
  const [approval, setApproval] = useState({});
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [transactionsForApproval, setTransactionsForApproval] = useState([]);
  const [success, setSuccess] = useState({
    show: false,
    payload: {
      totalTrans: 0,
      approvedTrans: 0,
      rejectedTrans: 0,
    },
  });

  const dispatch = useDispatch();

  const fetchTransactions = useCallback(
    (period, s, filter) => dispatch(getSMSTransactionsAdminAction(period, s, filter)),
    [dispatch]
  );

  const {
    transcdata,
    loading,
    approving,
    meta = {
      last_page: 1,
      limit: 20,
      next_page: 0,
      page: 1,
      previous_page: 0,
    },
  } = useSelector(({ smsTransactions }) => ({
    transcdata: smsTransactions.transactionsDataAdmin,
    loading: smsTransactions.loading,
    approving: smsTransactions.approving,
    meta: smsTransactions.transactionsDataAdminMeta,
  }));

  useEffect(() => {
    fetchTransactions('30');
  }, []);

  const handleApproval = (approval) => {
    setApproval(approval);
    setShowApprovalModal(true);
  };

  const handlePageChange = (page) => {
    fetchTransactions({ page: page, 0: 30 });
    // console.log(page);
  };

  const approveSMSTransactions = useCallback(
    (payload) => dispatch(approveSMSTransactionsAction(payload)),
    [dispatch]
  );

  const columns = useMemo(
    () => [
      { accessor: 'message_content', Header: 'SMS CONTENT' },
      { accessor: 'phone_number', Header: 'PHONE' },
      // { accessor: 'error', Header: 'ERROR', Cell: ({ value }) => <Text color="red">{value}</Text> },
      { accessor: 'bank_name', Header: 'REGEX BANK NAME' },
      { accessor: 'account_number', Header: 'REGEX ACCT#' },
      {
        accessor: 'bank_list',
        Header: 'BANK LIST',
        Cell: ({ row }) => (
          <SelectField disabled defaultValue={row?.original?.last_history?.bank_name || ''}>
            <option value="">Select Bank</option>
              <option value="Access">Access Bank</option>
              <option value="Citibank">Citibank Nigeria</option>
              <option value="Diamond">Diamond Bank</option>
              <option value="Ecobank">Eco Bank</option>
              <option value="FirstBank">First Bank</option>
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
        ),
      },
      {
        accessor: 'new_account_number',
        Header: 'NEW ACCT NUMBER',
        Cell: ({ row }) => (
          <FormInput
            placeholder="Enter account #"
            disabled
            defaultValue={row?.original?.last_history?.account_number || ''}
          />
        ),
      },
      {
        Header: 'Bank Name Accuracy'.toUpperCase(),
        Cell: ({ row }) => (
          <Text
            weight="bold"
            color={
              Number(row?.original?.last_history?.resolved_bank_name_accuracy) < 70
                ? 'orange'
                : 'green'
            }
          >
            {row?.original?.last_history?.resolved_bank_name_accuracy} %
          </Text>
        ),
      },
      {
        Header: 'Bank Number Accuracy'.toUpperCase(),
        Cell: ({ row }) => (
          <Text
            weight="bold"
            color={
              Number(row?.original?.last_history?.resolved_account_number_accuracy) < 70
                ? 'orange'
                : 'green'
            }
          >
            {row?.original?.last_history?.resolved_account_number_accuracy} %
          </Text>
        ),
      },
      { accessor: (row) => new Date(row.created_at).toUTCString() || 'N/A', Header: 'TIMESTAMP' },
      {
        accessor: 'status',
        Header: 'ACTION',
        Cell: ({ row, setApprovals }) => <>{renderActionField(row.original, setApprovals)}</>,
      },
    ],
    []
  );

  const {
    areAllIndeterminate,
    areAllSelected,
    handleSelect,
    handleSelectAll,
    isItemSelected,
    selections,
    period,
  } = props;

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
    data: transcdata,
  });

  const setApprovals = (id) => {
    if (typeof id === 'string') {
      const transaction = transcdata.find((tx) => tx.id === id);
      setApproval(transaction);
    } else {
      setApproval(Object.keys(id));
    }

    setShowApprovalModal(true);
  };

  const handleApproved = async (id) => {
    const payload = Array.isArray(id) ? id : [id];
    const res = await approveSMSTransactions({ ids: payload });

    const failedTransactions = res.data.data.filter((trans) => !trans.success);
    const successfulTransactions = res.data.data.filter((trans) => trans.success);
    setShowApprovalModal(false);

    setSuccess({
      show: true,
      payload: {
        totalTrans: `${
          typeof id === 'string' ? '1 Transaction' : `${payload.length} Transactions`
        } For Approval`,
        approvedTrans: `${successfulTransactions.length} Approved`,
        rejectedTrans: `${failedTransactions.length} Not Approved`,
      },
    });
    await fetchTransactions(this.props.filterPayload);
  };

  const isSelectionsMatchingStatus = (status) => {
    const ids = Object.keys(selections);
    if (ids.length) {
      const selectionsNotMatchingStatus = [];
      ids?.forEach((item) => {
        const tx = transcdata.find((i) => i.id === item)?.status;
        if (tx !== status) {
          selectionsNotMatchingStatus.push(true);
        }
      });
      return selectionsNotMatchingStatus.length ? true : false;
    }
    return true;
  };

  return (
    <>
      {showApprovalModal && (
        <ApprovalModal
          loading={approving}
          approval={approval}
          setSuccess={setSuccess}
          toggleModal={() => setShowApprovalModal(!showApprovalModal)}
          handleComplete={(id) => handleApproved(id)}
        />
      )}
      {success.show && (
        <ApprovalSucess
          heading="APPROVE PAYMENT"
          payload={success.payload}
          close={() => setSuccess((s) => ({ ...s, show: false }))}
        />
      )}
      <CardHeader
        style={{
          borderBottom: '1px solid #D3D3D3',
          padding: '1rem 1.6rem',
        }}
      >
        <div>
          <EntriesButton
            onClick={() => {
              setApprovals(selections);
              setShowApprovalModal(true);
            }}
            disabled={isSelectionsMatchingStatus('process_for_approval')}
          >
            Approve
          </EntriesButton>
        </div>
        <EntriesFilterBy>
          Filter By
          <EntriesSelect
            name="status"
            onChange={(event) =>
              props.setFilterPayload({
                ...props.filterPayload,
                [event.target.name]: event.target.value,
              })
            }
            noRadius
          >
            <option defaultChecked value="">
              No Filters
            </option>
            {/* <option value="resolved">Resolved</option> */}
            <option value="process_for_approval">Needs Approval</option>
            {/* <option value="approved">approved</option> */}
          </EntriesSelect>
        </EntriesFilterBy>
      </CardHeader>
      <TableWrapper>
        <Table {...getTableProps()}>
          <Table.Head>
            {headerGroups.map((headerGroup) => (
              <Table.Tr {...headerGroup.getHeaderGroupProps()} empty>
                <Table.Th>
                  <Table.Checkbox
                    name="thcheckbox"
                    type="checkbox"
                    checked={areAllSelected(transcdata)}
                    indeterminate={areAllIndeterminate(transcdata)}
                    onChange={() => handleSelectAll(transcdata)}
                  />
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

            {!transcdata.length && !loading && (
              <Table.Tr empty style={{ height: '500px' }}>
                <Table.Td align="center" colSpan="30">
                  <EmptyState text="No logs to display yet" />
                </Table.Td>
              </Table.Tr>
            )}

            {transcdata.length > 0 &&
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <Table.Tr {...row.getRowProps()}>
                    <Table.Td
                      className="sticky"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Table.Checkbox
                        name="trcheckbox"
                        type="checkbox"
                        // checked={isItemSelected(row.original.id)}
                        // onChange={() => handleSelect(row.original.id)}
                      />
                    </Table.Td>
                    {row.cells.map((cell) => (
                      <Table.Td {...cell.getCellProps()}>
                        {cell.render('Cell', { setApprovals })}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                );
              })}
          </Table.Body>
        </Table>
        <Pagination
          onPageChange={handlePageChange}
          pages={meta.last_page}
          page={meta.page}
          previousText="previous"
          nextText="next"
          PageButtonComponent={PaginationBTN}
        />
      </TableWrapper>
    </>
  );
};

export default withSelections(ApprovalsTable);
