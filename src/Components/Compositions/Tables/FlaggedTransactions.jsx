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
  toastMessage,
  CardHeader,
} from '../../Elements';
import { EntriesButton, EntriesFilterBy, EntriesSelect } from '../../../pages/Admin/Approvals';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import ApprovalSucess from '../Modals/SuccessModal';
import Pagination, { PaginationBTN } from '../Pagination';

import {
  approveSMSTransactionsAction,
  getSMSTransactionsAdminAction,
  getFlaggedTransactionsAction,
} from '../../../redux/actions/transactions.actions';
import EmptyState from '../EmptyState';

import FlaggedTransactionsModal from '../Modals/FlaggedTransactionsModal';
import { exportFundingTableDataAction, getApproveFlaggedTransactionAction } from '../../../redux/actions/disbursements.actions';
import { Flex } from 'rebass';
import { Paginator } from '../../Molecules/Paginator';

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

const FlaggedTransactionsTable = (props) => {
  const [approval, setApproval] = useState({});
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [success, setSuccess] = useState({
    show: false,
    payload: {
      totalTrans: 0,
      approvedTrans: 0,
      rejectedTrans: 0,
    },
  });

  const [isOpen, setIsOpen] = useState(false)

  const [currTransc, setCurrTransc] = useState('')

  const dispatch = useDispatch();

  const fetchFlaggedTransactions = useCallback(
    (payload) => dispatch(getFlaggedTransactionsAction(payload)),
    [dispatch]
  );

  const getApproveFlaggedTransaction = useCallback(
    (payload) => dispatch(getApproveFlaggedTransactionAction(payload)),
    [dispatch]
  );

  // const exportFlaggedTransactions = useCallback(
  //   (payload) => dispatch(exportf(payload)),
  //   [dispatch]
  // );    

  const { data, loading, meta, approvingFlaggedTrasaction } = useSelector(({ disbursement }) => ({
    data: disbursement.flaggedTransactions,
    loading: disbursement.loadingFlaggedTransactions,
    meta: disbursement.flaggedTransactionsMeta,
    approvingFlaggedTrasaction: disbursement.approvingFlaggedTrasaction
  }));

  const approveTransaction = async () => {
    try {
      if (!currTransc) return toastMessage({type:'error', message:'Invalid transaction ID'})
      await getApproveFlaggedTransaction({transaction_id: currTransc})
      toastMessage({type:'success', message: 'Approval was successful'})
      fetchFlaggedTransactions(props.payload);
      handleCloseModal()
    } catch (error) {
      toastMessage({type:'error', message: error?.response?.data?.message || 'Approval failed'})
      handleCloseModal()
    }
  }

  const handleCloseModal = () => {
    setCurrTransc('')
    setIsOpen(false)
  }

  const handleOpenModal = (id) => {
    setCurrTransc(id)
    setIsOpen(true)
  }  

  useEffect(() => {
    fetchFlaggedTransactions(props.payload);
  }, []);

  useEffect(() => {
    fetchFlaggedTransactions(props.payload);
  }, [props.payload.period, props.payload.status]);

  const handlePagination = ({selected}) => {
    fetchFlaggedTransactions({...props.payload, page: selected+1});
  }

  const handleApproval = (approval) => {
    setApproval(approval);
    setShowApprovalModal(true);
  };

  const approveSMSTransactions = useCallback(
    (payload) => dispatch(approveSMSTransactionsAction(payload)),
    [dispatch]
  );

  const columns = useMemo(
    () =>[

    {
      accessor: 'account_name',
      Header: 'ACCOUNT NAME',
      Cell: ({ value }) => (value ? value : 'N/A'),
    },
    { accessor: 'bank_name', Header: 'BANK NAME' },
    { accessor: 'status', Header: 'STATUS' },
    {
      accessor: 'account_number',
      Header: 'ACCOUNT NUMBER',
      Cell: ({ value }) => (value ? value : 'N/A'),
    },
    {
      accessor: 'programme_name',
      Header: 'PROGRAMME NAME',
      Cell: ({ value }) => (value ? value : 'N/A'),
    },      
    {
      accessor: 'amount',
      Header: 'AMOUNT',
      Cell: ({ value }) => <span>&#8358;{value}</span>,
    },
    { accessor: 'paid_at', Header: 'PAY AT', Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'), },
    {
      accessor: 'flagged_at',
      Header: 'FLAGGED AT',
      Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'),
    }],[]
  );

  const {
    selections,
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
    data,
  });

  const setApprovals = (id) => {
    if (typeof id === 'string') {
      const transaction = data.find((tx) => tx.id === id);
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
  };

  const isSelectionsMatchingStatus = (status) => {
    const ids = Object.keys(selections);
    if (ids.length) {
      const selectionsNotMatchingStatus = [];
      ids.forEach((item) => {
        const tx = data.find((i) => i.id === item).status;
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

        <Flex justifyContent="space-between" width={[1, 1, 1, "40%"]}>
          <EntriesFilterBy>
            Filter By
            <EntriesSelect
              name="status"
              onChange={(event) => props.setPayload({...props.payload, [event.target.name]: event.target.value})
                // fetchFlaggedTransactions(period || "", event.target.options[event.target.selectedIndex].value)
              }
              noRadius
            >
              <option defaultChecked value="">No Filters</option>
              <option value="paid">Paid</option>
              <option value="not_paid">Not Paid</option>
            </EntriesSelect>
          </EntriesFilterBy>
          
          <Button onClick={(e) =>{
            e.preventDefault()
          }} bg="black" color="white">
            EXPORT LIST
          </Button>   

        </Flex>


      </CardHeader>
      <TableWrapper>
        <Table {...getTableProps()}>
          <Table.Head>
            {headerGroups.map((headerGroup) => (
              <Table.Tr {...headerGroup.getHeaderGroupProps()} empty>
                {/* <Table.Th  style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                  <Table.Checkbox
                    name="thcheckbox"
                    type="checkbox"
                    checked={areAllSelected(data)}
                    indeterminate={areAllIndeterminate(data)}
                    onChange={() => handleSelectAll(data)}
                  />
                </Table.Th> */}
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
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            ))}
     
          </Table.Head>
          <Table.Body {...getTableBodyProps()}>

          {(!data.length && !loading && (
            <Table.Tr empty style={{ height: '500px' }}>
              <Table.Td align="center" colSpan="30">
                <EmptyState text="No flagged transactions to display yet" />
              </Table.Td>
            </Table.Tr>
          )) ||
            null}

            {loading ? (
              <Table.Tr>
                <Table.Td align="center" colSpan="30">
                  <SpinnerContainer>
                    <Spinner color="mediumBue" />
                  </SpinnerContainer>
                </Table.Td>
              </Table.Tr>
            ):
            rows?.map((row, i) => {
              prepareRow(row);
              return (
                <Table.Tr {...row.getRowProps()}>
                  {/* <Table.Td className="sticky"  style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                    <Table.Checkbox
                      name="trcheckbox"
                      type="checkbox"
                      checked={isItemSelected(row.original.id)}
                      onChange={() => handleSelect(row.original.id)}
                    />
                  </Table.Td> */}
                  {row.cells.map((cell) => (
                    <Table.Td {...cell.getCellProps()}>
                      {cell.render('Cell', { handleApproval })}
                    </Table.Td>
                  ))}
                    <Table.Td>
                      <Table.ViewButton
                        style={{
                          padding: '3px 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          boxShadow: '0 0 0',
                        }}
                        onClick={() => handleOpenModal(row.original.id)}
                      >
                        Approve
                      </Table.ViewButton>
                    </Table.Td>                  
                </Table.Tr>
              );
            })}
          </Table.Body>
        </Table>

        {Boolean(Object.keys(meta).length) && (
          <Flex mt="2rem" justifyContent="flex-end">
            <Paginator 
              pageCount={meta?.last_page || 0}
              onPageChange={handlePagination}
              disableInitialCallback
              forcePage={meta?.page - 1 || 0}          
            />
          </Flex>
        )}           
      </TableWrapper>

     {
       isOpen && (
        <FlaggedTransactionsModal loading={approvingFlaggedTrasaction} close={() => handleCloseModal()} approveTransaction={() => approveTransaction()} />         
       )
     }


  
    </>
  );
};

export default withSelections(FlaggedTransactionsTable);
