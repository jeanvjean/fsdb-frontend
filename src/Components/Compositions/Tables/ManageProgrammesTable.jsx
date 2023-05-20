import React from 'react';
import { useTable } from 'react-table';
import styled from '@emotion/styled';
import { TableWrapper, Table } from '../../Elements';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import Pagination, { PaginationBTN } from '../Pagination';
import EmptyState from '../EmptyState';
import { Paginator } from '../../Molecules/Paginator';
import { Flex } from 'rebass';

export const TableHeader = styled.div`
  background-color: #f4f4f4;
  font-size: 1.3rem;
  margin-top: 4rem;
  color: ${({ theme }) => theme.colors.blue1};
  text-transform: uppercase;
  font-weight: 600;
  align-items: center;
  display: flex;

  @media (max-width: ${({ theme: { breaks } }) => breaks.MD}) {
    font-size: 1rem;
  }

  ~ div table thead {
    background-color: #ffffff;
  }

  ~ div table tbody tr td,
  ~ div table thead tr th {
    border-right: 1px solid #dededf;
  }

  ~ div table tbody tr td:last-of-type,
  ~ div table thead tr th:last-of-type {
    border-right: none;
  }
`;

const Wrapper = styled.div`
  .bolden-last {
    tr:nth-last-child(-n + 2) {
      font-weight: bold;
      // td {
      //   font-size: 1.1rem;
      // }
    }
  }
`;

const ManageProgrammesTable = ({ columns, data, tableTitle, tableHeaderAction, paginationMeta, loading, handlePagination, actions }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  return (
    <Wrapper>
      <TableWrapper>
        <TableHeader>
          {tableTitle}
          {tableHeaderAction}
        </TableHeader>
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
          <Table.Body
            {...getTableBodyProps()}
            className={
              ['Disbursements', 'RETRACTED', 'CASHED OUT'].includes(tableTitle) ? 'bolden-last' : ''
            }
          >
            {loading && (
            <Table.Tr>
              <Table.Td align="center" colSpan="30">
                <SpinnerContainer>
                  <Spinner color="mediumBue" />
                </SpinnerContainer>
              </Table.Td>
            </Table.Tr>
          )}
            {rows?.map((row, i) => {
              prepareRow(row);
              return (
                <Table.Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Table.Td {...cell.getCellProps()}>{cell.render('Cell', {...actions})}</Table.Td>
                  ))}
                </Table.Tr>
              );
            })}

        {
          !Boolean(data.length) && !loading && (
            <Table.Tr empty style={{ height: '200px' }}>
            <Table.Td align="center" colSpan="30">
            <EmptyState  height="100%" text="No Data Is Available"/>  
            </Table.Td>
          </Table.Tr>  
  
          )
        }            
          </Table.Body>
        </Table>


        {Boolean(Object.keys(paginationMeta).length) && (
          <Flex mt="2rem" justifyContent="flex-end">
            <Paginator 
              pageCount={paginationMeta?.last_page || 0}
              onPageChange={handlePagination}
              disableInitialCallback
              forcePage={paginationMeta?.page - 1 || 0}          
            />
          </Flex>
        )}
      </TableWrapper>
    </Wrapper>
  );
};

ManageProgrammesTable.defaultProps = {
  handlePagination: () => false,
  paginationMeta: {}
}

export default ManageProgrammesTable;
