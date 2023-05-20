/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button } from '../../Elements';
import { Approval, } from './ApprovalModal';
import {Box, Flex} from 'rebass'

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

const FlaggedTransactionsModal = ({approveTransaction, loading, close}) => {


  const handleClose = async () => {
    close();
  };

  return (
    <ModalWrapper>
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
        <Approval.Header>APPROVE FLAGGED TRANSACTIONS</Approval.Header>

        <Flex justifyContent="center">
          Are you sure you want to approve this transaction?
        </Flex>

        <Approval.Buttons>
          <Button
            color="white"
            bg="mediumBue"
            onClick={() => approveTransaction()}
            mr="1rem"
            loading={loading}
          >
            Continue
          </Button>
          <Button color="white" bg="red" onClick={handleClose}>
            Close
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};

FlaggedTransactionsModal.defaultProps = {
  approveTransaction: () => false,
  loading: false
}

export default FlaggedTransactionsModal;
