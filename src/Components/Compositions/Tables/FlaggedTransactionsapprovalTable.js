import React, { useEffect, useMemo, useState } from 'react'
import withSelections from 'react-item-select';
import { useTable } from 'react-table';
import { Box, Flex } from 'rebass';
import { EntriesFilterBy } from '../../../pages/Admin/Approvals';
import { EntriesSelect } from '../../../pages/Admin/FlaggedTransactions';
import { CardHeader, Table, TableWrapper } from '../../Elements';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import { Paginator } from '../../Molecules/Paginator';
import EmptyState from '../EmptyState';

import FlaggedTransactionsDetailModal from '../Modals/FlaggedTranscDetailModal';

const FlaggedTransactionsApprovalTable = (props) => {

  const columns = useMemo(
    () =>[

    {
      accessor: 'account_name',
      Header: 'ACCOUNT NAME',
      Cell: ({ value }) => (value ? value : 'N/A'),
    },
    { accessor: 'bank_name', Header: 'BANK NAME' },
    { accessor: 'transaction_status', Header: 'STATUS' },
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
    { accessor: 'paid_at', Header: 'PAY AT', Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'), },
    {
      accessor: 'flagged_at',
      Header: 'FLAGGED AT',
      Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'),
    }],[]
  );

  const [currTranscDetail, setCurrTranscDetail] = useState({})
  const [isOpenTrancDetail, setIsOpenTrancDetail] = useState(false)

  const handleShowTransactionDetail = (trans) => {
    setIsOpenTrancDetail(true)
    setCurrTranscDetail(trans)
  }


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
    data: props.data,
  });

  return (
    <Box>
      <CardHeader
        style={{
          borderBottom: '1px solid #D3D3D3',
          padding: '1rem 1.6rem',
        }}
      >
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
                {/* <Table.Th>Action</Table.Th> */}
              </Table.Tr>
            ))}            
          </Table.Head>
          <Table.Body {...getTableBodyProps()}>

            {(!props.data.length && !props.loading && (
              <Table.Tr empty style={{ height: '500px' }}>
                <Table.Td align="center" colSpan="30">
                  <EmptyState text="No flagged transactions to display yet" />
                </Table.Td>
              </Table.Tr>
            ))}

            {props.loading && (
              <Table.Tr>
                <Table.Td align="center" colSpan="30">
                  <SpinnerContainer>
                    <Spinner color="mediumBue" />
                  </SpinnerContainer>
                </Table.Td>
              </Table.Tr>
            )}  
            
            {
              rows?.map((row, i) => {
                prepareRow(row);
                return (
                  <Table.Tr  style={{cursor: 'pointer'}}  {...row.getRowProps()} onClick={() => handleShowTransactionDetail(row.original)}>
                    {row.cells.map((cell) => (
                      <Table.Td {...cell.getCellProps()}>
                        {cell.render('Cell', {  })}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                )
              })  
            }
                   

          </Table.Body>
        </Table>
        {/* <Pagination
          onPageChange={(page) => props.setPayload({...props.payload, page})}
          pages={props.meta.last_page || 0}
          page={props.meta.page || 1}
          previousText="previous"
          nextText="next"
          PageButtonComponent={PaginationBTN}
        />         */}

      <Flex mt="2rem" justifyContent="flex-end">
        <Paginator 
          pageCount={props?.meta?.last_page || 0}
          onPageChange={props.handlePagination}
          disableInitialCallback
          forcePage={props?.meta?.page - 1 || 0}          
        />
      </Flex>

      </TableWrapper> 

      {
       isOpenTrancDetail && (
        <FlaggedTransactionsDetailModal data={currTranscDetail} close={() => setIsOpenTrancDetail(false)}  />         
       )
     }         
    </Box>
  )
}

FlaggedTransactionsApprovalTable.defaultProps = {
  handlePagination: () => false
}

export default withSelections(FlaggedTransactionsApprovalTable);
