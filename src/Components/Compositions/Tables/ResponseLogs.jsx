import React from 'react'
import { useTable } from 'react-table';
import { Flex } from 'rebass';
import { Table, TableWrapper } from '../../Elements';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import { Paginator } from '../../Molecules/Paginator';
import EmptyState from '../EmptyState';

const columns = [
  {
    accessor: 'id',
    Header: 'ID',
  },  
  {
    accessor: 'phone_number',
    Header: 'Phone Number',
  },
  {
    accessor: 'message',
    Header: 'Message',
  },
  {
    accessor: 'created_at',
    Header: 'Timestamp',
    Cell: ({ value }) => value ? new Date(value).toUTCString() : 'N/A'
  },

]; 

const ResponseLogsTable = ({ data, loading, meta, handlePagination }) => {

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <Table.Head style={{ borderTop: '1px solid #DEDEDF', background: '#F5F5F5' }}>
          {headerGroups.map((headerGroup) => (
            <Table.Tr {...headerGroup.getHeaderGroupProps()} empty>
              {headerGroup?.headers.map((col) => {
                return (
                  <Table.Th
                    align="center"
                    {...col.getHeaderProps()}
                    style={{ minWidth: '110px' }}
                    key={col.id}
                    data-tip
                    data-for={col.id}
                    data-columnname={col.id}
                  >
                    {col.render('Header')}
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
                <EmptyState text="No logs to display yet" />
              </Table.Td>
            </Table.Tr>
          )) ||
            null}
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Table.Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Table.Td {...cell.getCellProps()}>{cell.render('Cell')}</Table.Td>
                ))}
              </Table.Tr>
            );
          })}
        </Table.Body>
      </Table>
        
        {
          Object.keys(meta).length && (
            <Flex mt="2rem" justifyContent="flex-end">
              <Paginator 
                pageCount={meta?.last_page}
                onPageChange={handlePagination}
                disableInitialCallback
                forcePage={meta?.page - 1}    
              />        
            </Flex>            
          )
        }
    </TableWrapper>
  )
}

export default ResponseLogsTable
