import React, { useState, useMemo, createRef, useEffect } from 'react';
import withSelections from 'react-item-select';
import { useTable } from 'react-table';
import { Spinner, SpinnerContainer } from '../../Elements/Spinner';
import { TableWrapper, Table, CardHeader } from '../../Elements';
import { EntriesButton, EntriesFilterBy, EntriesSelect } from '../../../pages/Admin/Approvals';
import Pagination, { PaginationBTN } from '../Pagination';
import { utils } from '../../../api/utils';
import EmptyState from '../EmptyState';
import { Flex } from 'rebass';
import { Paginator } from '../../Molecules/Paginator';

export const tableHeadStyles = {
  minWidth: '50px',
};

const tableViews = {
  ussd: [
    { accessor: 'message_content', Header: 'SMS CONTENT' },
    { accessor: 'phone_number', Header: 'PHONE' },
    { accessor: 'bank_name', Header: 'REGEX BANK NAME' },
  ],
  sms: [
    { accessor: 'sms_content', Header: 'Date' },
    { accessor: 'phone_number', Header: 'Text' },
    { accessor: 'time_spent1', Header: 'From' },
    { accessor: 'time_spent2', Header: 'To' },
    { accessor: 'time_spent3', Header: 'Cost' },
  ],
  beneficiaries: [
    { accessor: 'account_name', Header: 'ACCOUNT NAME' },
    { accessor: 'account_number', Header: 'ACCOUNT NUMBER' },
    { accessor: 'bank_name', Header: 'BANK NAME' },
    { accessor: 'programme_name', Header: 'PROGRAMME' },
    { accessor: 'amount', Header: 'AMOUNT', Cell: ({ value }) => <span>&#8358;{value}</span> },
    {
      accessor: 'transaction_date',
      Header: 'TRANSACTION DATE',
      Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'),
    },
    {
      accessor: 'paid_at',
      Header: 'PAID AT',
      Cell: ({ value }) => (value ? new Date(value).toUTCString() : 'N/A'),
    },
  ],
};

const data = {
  ussd: [{ message_content: 'some content', phone_number: '08128398383', bank_name: 'some bank' }],
  sms: [
    {
      sms_content: 'some content',
      phone_number: '08128398383',
      time_spent1: '12 seconds',
      time_spent2: '12 seconds',
      time_spent3: '12 seconds',
    },
  ],
  beneficiaries: [],
};

const DisbursementsLogsTable = (props) => {
  //   const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const ref = createRef();
  const [allBands, setAllBands] = useState([])
  //   const { ref, inView, entry } = useInView({
  //     /* Optional options */
  //     threshold: 0,
  //   });

  // useEffect(() => {
  //   const cachedRef = ref.current;
  //   const observer = new IntersectionObserver(
  //     ([e]) => {
  //       console.log(e.intersectionRatio, '-->>');
  //       return setIsSticky(e.intersectionRatio < 1);
  //     },
  //     {
  //       rootMargin: '-22% 0px 0px 0px',
  //       threshold: [1],
  //     }
  //   );

  //   observer.observe(cachedRef);

  //   // unmount
  //   return function () {
  //     observer.unobserve(cachedRef);
  //   };
  // }, []);

  //   const fetchTransactions = useCallback(
  //     (period) => dispatch(getSMSTransactionsAdminAction(period)),
  //     [dispatch]
  //   );

  //   const { data, loading, approving } = useSelector(({ smsTransactions }) => ({
  //     data: smsTransactions.transactionsDataAdmin,
  //     loading: smsTransactions.loading,
  //     approving: smsTransactions.approving,
  //   }));

  //   useEffect(() => {
  //     fetchTransactions('30');
  //   }, []);

  const fetchAllBands= async () => {
    try {
      const res= await utils.fetchAllBands()
      setAllBands(res.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchAllBands()
  }, [])

  const { areAllIndeterminate, areAllSelected, tableToView, handleSelectAll, selections } = props;

  const columns = useMemo(() => tableViews[tableToView], [tableToView]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: props.data[tableToView],
  });

  return (
    <>
      {/* {false && (
        <ApprovalModal
          loading={approving}
          approval={approval}
          setSuccess={setSuccess}
          toggleModal={() => setShowApprovalModal(!showApprovalModal)}
          handleComplete={(id) => handleApproved(id)}
        />
      )} */}
      <CardHeader
        ref={ref}
        className="sticky"
        style={{
          borderBottom: '1px solid #D3D3D3',
          padding: '1rem 1.6rem',
          position: `${isSticky ? 'sticky' : ''}`,
        }}
      >
        {/* <div>
          <EntriesButton
            onClick={() => {
              setApprovals(selections);
              setShowApprovalModal(true);
            }}
            disabled={isSelectionsMatchingStatus('process_for_approval')}
          >
            View - something
          </EntriesButton>
        </div> */}
        <EntriesFilterBy>
          Filter By
          <EntriesSelect
            name="bands"
            onChange={(event) => {
              // fetchTransactions(event.target.options[event.target.selectedIndex].value)
              // props.fetchData[tableToView](props.period, 1, '', props.searchValue,  );
              props.setPayload({...props.payload, bands: event.target.value})
            }}
            noRadius
          >
            <option defaultChecked value="">No Filters</option>
            {
              allBands.map(b => <option value={b.amount}>{b.amount}</option>)
            }
          </EntriesSelect>
        </EntriesFilterBy>
      </CardHeader>
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
              </Table.Tr>
            ))}
          </Table.Head>
          <Table.Body {...getTableBodyProps()}>
            {props.loading && (
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
                    <Table.Td {...cell.getCellProps()}>{cell.render('Cell', {})}</Table.Td>
                  ))}
                </Table.Tr>
              );
            })}

            {(!props.data[tableToView].length && !props.loading && (
              <Table.Tr empty style={{ height: '500px' }}>
                <Table.Td align="center" colSpan="30">
                  <EmptyState text="No data to be displayed yet" />
                </Table.Td>
              </Table.Tr> 
            ))}
          </Table.Body>


        </Table>

        {Boolean(Object.keys(props.meta[tableToView]).length) && (
          <Flex mt="2rem" justifyContent="flex-end">
            <Paginator 
              pageCount={props.meta[tableToView]?.last_page || 0}
              onPageChange={props.handlePagination}
              disableInitialCallback
              forcePage={props.meta[tableToView]?.page - 1 || 0}          
            /> 
          </Flex>
        )}                   
      </TableWrapper>
    </>
  );
};

export default withSelections(DisbursementsLogsTable);
