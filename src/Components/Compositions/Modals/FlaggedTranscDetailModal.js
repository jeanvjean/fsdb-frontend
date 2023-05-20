/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button } from '../../Elements';
import { Approval, } from './ApprovalModal';
import {Box, Flex} from 'rebass'
import {  Text } from '../../Elements';

export const modalShadow = {
  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
};

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  input {
    width: 80%;
    align-self: center;
  }

  .react-date-picker__wrapper {
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    background: ${(p) => p.theme.colors.white};

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.green2};
    }
    * {
      color: ${({ theme }) => theme.colors.dark4};
      &:focus {
        outline: none !important;
      }
    }
  }
`;

const FlaggedTransactionsDetailModal = ({data, close}) => {


  const handleClose = async () => {
    close();
  };

  return (
    <ModalWrapper>
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
        <Approval.Header>TRANSACTION DETAIL</Approval.Header>

        <Flex justifyContent="center" alignItems="center">
          <Box>
            <Flex mt="1rem">
              <Text>Approved By: </Text>
              <Flex pl="0.5rem">
                <Text>{data.first_name}</Text>
                <Text pl="0.5rem">{data.last_name}</Text>
              </Flex>
            </Flex>
            <Flex mt="1rem">
              <Text>Approval Date: </Text>
              <Text pl="0.5rem">{data.created_at ? new Date(data.created_at).toLocaleDateString('en-US') : 'N/A'}</Text>
            </Flex>                    
            <Flex mt="1rem">
              <Text>Account Name: </Text>
              <Text pl="0.5rem">{data.account_name}</Text>
            </Flex>
            <Flex mt="1rem">
              <Text>Account Number: </Text>
              <Text pl="0.5rem">{data.account_number}</Text>
            </Flex>
            <Flex mt="1rem">
              <Text>Bank Name: </Text>
              <Text pl="0.5rem">{data.bank_name}</Text>
            </Flex>
            <Flex mt="1rem">
              <Text>Transaction Date: </Text>
              <Text pl="0.5rem">{data.transaction_date || 'N/A'}</Text>
            </Flex>
            <Flex mt="1rem">
              <Text>Programme Name: </Text>
              <Text pl="0.5rem">{data.programme_name}</Text>
            </Flex>                                                    
          </Box>
        </Flex>

        <Approval.Buttons>

          <Button color="white" bg="red" onClick={handleClose}>
            Close
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};

FlaggedTransactionsDetailModal.defaultProps = {
  loading: false,
  data: {}
}

export default FlaggedTransactionsDetailModal;
