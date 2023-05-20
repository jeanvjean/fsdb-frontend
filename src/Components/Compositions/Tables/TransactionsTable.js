import React, { useState } from 'react';
import { useTable } from 'react-table';
import { Box, Flex } from 'rebass';
import { utils } from '../../../api/utils';
import {
  EntriesButton,
  EntriesFilterBy,
  EntriesSelect,
} from '../../../pages/Admin/FlaggedTransactions';
import { Button, CardHeader, Table, TableWrapper, toastMessage } from '../../Elements';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import { Paginator } from '../../Molecules/Paginator';
import EmptyState from '../EmptyState';

// toastMessage({
//   type: 'success',
//   message: 'Password confirmed successfully',
// });

const TransactionTable = ({
  data,
  loading,
  meta,
  payload,
  setPayload,
  handlePagination,
  setShowLegendStatus,
}) => {
  const [retryLoader, setRetryLoader] = useState('');

  const columns = React.useMemo(
    () => [
      {
        accessor: 'phone_number',
        Header: 'PHONE NUMBER',
        Cell: ({ value }) => (value ? value : 'N/A'),
      },
      {
        accessor: 'account_name',
        Header: 'ACCOUNT NAME',
        Cell: ({ value }) => (value ? value : 'N/A'),
      },
      { accessor: 'bank_name', Header: 'BANK NAME', Cell: ({ value }) => (value ? value : 'N/A') },
      {
        accessor: 'account_number',
        Header: 'ACCOUNT NUMBER',
        Cell: ({ value }) => (value ? value : 'N/A'),
      },
      {
        accessor: 'amount',
        Header: 'AMOUNT',
        Cell: ({ value }) => <span>&#8358;{value}</span>,
      },
      {
        accessor: 'channel',
        Header: 'CHANNEL',
        Cell: ({ value }) => (value ? value : 'N/A'),
      },
      { accessor: 'status', Header: 'STATUS', Cell: ({ value }) => (value ? value : 'N/A') },
      {
        accessor: 'paid_at',
        Header: 'PAY AT',
        Cell: ({ value }) => (value ? new Date(value).toUTCString() : '[Not Yet]'),
      },
      {
        accessor: 'response_message',
        Header: 'MESSAGE',
        // Cell: ({ value }) => (value ? `${value}` : 'N/A'),
        Cell: (props) => {
          const { response_code, response_message, id } = props?.row.original;
          return (
            <>
              {response_message ? response_message : 'N/A'}
              {response_code === '1004' && (
                <Button
                  style={{ backgroundColor: '#7753F3', color: 'white' }}
                  onClick={() => retryTransaxn(id)}
                >
                  {retryLoader === id && <Spinner size="0.5rem" color="white" />} Retry
                </Button>
              )}
              {response_code === '1100' && (
                <Button
                  style={{ backgroundColor: '#7753F3', color: 'white' }}
                  onClick={() => requeryTransaxn(id)}
                >
                  {retryLoader === id && <Spinner size="0.5rem" color="white" />}Requery
                </Button>
              )}
            </>
          );
        },
      },
    ],
    [retryLoader]
  );

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

  const requeryTransaxn = async (payload) => {
    setRetryLoader(payload);
    try {
      const res = await utils.requeryTransaction({ transaction_id: payload });
      if (res.data.message === 'Success') {
        toastMessage({
          type: 'success',
          message: 'Transaction Successful',
        });
        setRetryLoader(null);
      }
    } catch (err) {
      setRetryLoader(null);
      toastMessage({
        type: 'error',
        message: err?.response?.data?.message || 'Could not validate authentication',
      });
    }
  };
  const retryTransaxn = async (payload) => {
    setRetryLoader(payload);
    try {
      const res = await utils.retryTransaction({ transaction_id: payload });
      if (res.data.message === 'Success') {
        toastMessage({
          type: 'success',
          message: 'Transaction Successful',
        });
        setRetryLoader(null);
      }
    } catch (err) {
      setRetryLoader(null);
      toastMessage({
        type: 'error',
        message: err?.response?.data?.message || 'Could not validate authentication',
      });
    }
  };

  return (
    <Box>
      <CardHeader
        style={{
          borderBottom: '1px solid #D3D3D3',
          padding: '1rem 1.6rem',
        }}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            setShowLegendStatus(true);
          }}
          bg="black"
          color="white"
        >
          STATUS LEGEND
        </Button>

        <div>
          {/* <EntriesButton
            onClick={() => {
              setApprovals(selections);
              setShowApprovalModal(true);
            }}
            disabled={isSelectionsMatchingStatus('process_for_approval')}
          >
            Approve
          </EntriesButton> */}
        </div>
        <EntriesFilterBy>
          Filter By
          <EntriesSelect
            name="status"
            onChange={
              (event) => setPayload({ ...payload, [event.target.name]: event.target.value })
              // fetchFlaggedTransactions(period || "N/A", event.target.options[event.target.selectedIndex].value)
            }
            noRadius
          >
            <option value="N/A" defaultChecked>
              No Filters
            </option>
            <option value="paid">Paid</option>
            <option value="not_paid">Not Paid</option>
            <option value="pending">Pending</option>
          </EntriesSelect>
        </EntriesFilterBy>
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
              </Table.Tr>
            ))}
          </Table.Head>
          <Table.Body {...getTableBodyProps()}>
            {(!data.length && !loading && (
              <Table.Tr empty style={{ height: '500px' }}>
                <Table.Td align="center" colSpan="30">
                  <EmptyState text="No transactions to display yet" />
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
            ) : (
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
                      <Table.Td {...cell.getCellProps()}>{cell.render('Cell', {})}</Table.Td>
                    ))}
                  </Table.Tr>
                );
              })
            )}
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
    </Box>
  );
};

TransactionTable.defaultProps = {
  handlePagination: () => false,
};

export default TransactionTable;
