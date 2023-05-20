import React, { useMemo, useEffect } from 'react';
import withSelections from 'react-item-select';
import { useHistory } from 'react-router-dom';
import { useTable } from 'react-table';
import { Flex } from 'rebass';
import { FormInput, TableWrapper, Table, Button, Heading, toastMessage } from '../../Elements';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import { Paginator } from '../../Molecules/Paginator';
import EmptyState from '../EmptyState';

export const tableHeadStyles = {
  minWidth: '50px',
};

const columns = [
  {
    accessor: 'first_name',
    Header: 'FIRST NAME',
    Cell: ({ value }) => (value ? value : '[No Name]'),
  },
  {
    accessor: 'last_name',
    Header: 'LAST NAME',
    Cell: ({ value }) => (value ? value : '[No Last Name]'),
  },
  {
    accessor: 'status',
    Header: 'STATUS',
    Cell: ({ value }) => (value ? value : 'N/A'),
  },  
  { accessor: 'email', Header: 'EMAIL' },
  { accessor: 'user_type', Header: 'USER TYPE' },
  // {
  //   accessor: 'last_login_at',
  //   Header: 'LAST LOGIN',
  //   Cell: ({ value }) => (value ? new Date(value).toDateString() : 'N/A'),
  // },
];

//

const AkuRepsTable = ({ isItemSelected, data, loading, routeType, meta, handlePagination }) => {
  const reps = useMemo(() => data, [data]);
  const { push } = useHistory()

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
    data: reps,
  });

  return (
    <>
      <TableWrapper >
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
                <Table.Th>ACTION</Table.Th>
              </Table.Tr>
            ))}
          </Table.Head>
          <Table.Body {...getTableBodyProps()}>

          {
              !data.length && !loading && (
                <Table.Tr empty style={{ height: '500px' }}>
                  <Table.Td align="center" colSpan="30">
                    <EmptyState text="No Users" />
                  </Table.Td>
                </Table.Tr>                
              )
            }

            {loading ? (
              <Table.Tr>
                <Table.Td align="center" colSpan="30">
                  <SpinnerContainer>
                    <Spinner color="mediumBue" />
                  </SpinnerContainer>
                </Table.Td>
              </Table.Tr>
            ) : (
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <Table.Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Table.Td {...cell.getCellProps()}>{cell.render('Cell')}</Table.Td>
                    ))}
                    <Table.Td>
                      <Table.ViewButton
                      
                        onClick={() => push(`/dashboard/${routeType}/${row?.original?.id || row?.original?.email}`) }
                      >
                        Manage User
                      </Table.ViewButton>
                    </Table.Td>
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

export default withSelections(AkuRepsTable);
