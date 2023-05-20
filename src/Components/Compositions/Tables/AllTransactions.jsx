import React, { useMemo } from 'react';
import withSelections from 'react-item-select';
import { useTable } from 'react-table';
import { Flex } from 'rebass';
import { FormInput, TableWrapper, Table, Button } from '../../Elements';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import { Paginator } from '../../Molecules/Paginator';
import EmptyState from '../EmptyState';
import Pagination, { PaginationBTN } from '../Pagination';

export const tableHeadStyles = {
  minWidth: '50px',
};

const columns = [
  {
    accessor: 'account_number',
    Header: 'ACCOUNT NUMBER',
    Cell: ({ value }) => (value ? value : 'N/A'),
  },
  {
    accessor: 'account_name',
    Header: 'ACCOUNT NAME',
    Cell: ({ value }) => (value ? value : 'N/A'),
  },
  { accessor: 'bank_name', Header: 'BANK NAME', Cell: ({ value }) => (value ? value : 'N/A') },
  {
    accessor: 'amount',
    Header: 'AMOUNT',
    Cell: ({ value }) => (value ? <span>&#8358; {value}</span> : 'N/A'),
  },
  {
    accessor: 'paid_at',
    Header: 'PAID AT',
    Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'),
  },
  {
    accessor: 'flagged',
    Header: 'FLAGGED',
    Cell: ({ value }) =>
      value ? (
        <span style={{ color: 'red' }}>TRUE</span>
      ) : (
        <span style={{ color: 'blue' }}>FALSE</span>
      ),
  },
  {
    accessor: 'response_message',
    Header: 'RESPONSE MESSAGAE',
    Cell: ({ value }) => (value ? value : 'N/A'),
  },
  { accessor: 'status', Header: 'STATUS' },
];

//

const AllTransactionsTable = ({ isItemSelected, data = [], meta, loading, handlePagination }) => {
  const reps = useMemo(() => data, [data]);
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

  return (
    <>
      <TableWrapper>
        <Table {...getTableProps()}>
          <Table.Head>
            {headerGroups.map((headerGroup) => (
              <Table.Tr {...headerGroup.getHeaderGroupProps()} empty>
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
            {!data.length && !loading && (
              <Table.Tr empty style={{ height: '500px' }}>
                <Table.Td align="center" colSpan="30">
                  <EmptyState text="No Transactions." />
                </Table.Td>
              </Table.Tr>
            )}

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
                    {row.cells.map((cell) => (
                      <Table.Td {...cell.getCellProps()}>{cell.render('Cell')}</Table.Td>
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
    </>
  );
};

export default withSelections(AllTransactionsTable);
