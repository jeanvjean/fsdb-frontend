/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button } from '../../Elements';
import { Approval, } from './ApprovalModal';
import {Box, Flex} from 'rebass'
import {  Text } from '../../Elements';
import { CancelIcon } from './UploadBeneficiariesModal';

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

const TransactionStatusLegend = ({close}) => {


  const handleClose = async () => {
    close();
  };

  const closeModal = (event) => {
    if (event.target.id === "modalRefWrapper") {
        close()
    } 
  }

  return (
    <ModalWrapper onClick={closeModal} id="modalRefWrapper" >
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
      <CancelIcon src="/cancel-icon.svg" alt="cancel" onClick={handleClose } style={{bottom: "8px"}} />
        <Approval.Header>STATUS LEGEND</Approval.Header>

        <Flex justifyContent="center" alignItems="center">
          <Box>
            <Flex mt="1rem">
              <Text fw="bold">Paid: </Text>
              <Text pl="0.5rem">
                Funds have been successfully sent to the beneficiary's bank account.
              </Text>
            </Flex>
            <Flex mt="1rem">
              <Text fw="bold">Not Paid: </Text>
              <Text pl="0.5rem">
                The Beneficiary is not paid.
              </Text>
            </Flex>
            <Flex mt="1rem">
              <Text fw="bold">Pending: </Text>
              <Text pl="0.5rem">
                Transaction is awaiting disbursement instruction.
              </Text>
            </Flex>
            <Flex mt="1rem">
              <Text fw="bold"> Disbursed: </Text>
              <Text pl="0.5rem">Beneficiary Loan set for disbursement, awaiting bank account number.</Text>
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

TransactionStatusLegend.defaultProps = {
  loading: false,
  data: {}
}

export default TransactionStatusLegend;
