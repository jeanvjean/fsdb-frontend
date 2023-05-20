/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button, Text, WarningIcon } from '../../Elements';

export const modalShadow = {
  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
};
export const Approval = {};
Approval.Header = styled.div`
  width: 100%;
  height: 70px;
  text-align: center;
  color: ${(p) => p.theme.colors.black};
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.colors.borderColor};
  font-size: ${(p) => p.theme.fontSizes.normal};
  font-weight: 600;
`;

Approval.Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-top: 1px solid ${(p) => p.theme.colors.borderColor};
  margin-top: 2rem;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 200px;
`;

const initialState = {
  ids: [],
};

const ApprovalModal = (props) => {
  const [state, setState] = useState(initialState);
  const { toggleModal, setSuccess, ids, approval, handleComplete, loading } = props;

  useEffect(() => {
    setState({ ...state, ids });
  }, []);

  return (
    <ModalWrapper>
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
        <Approval.Header>APPROVE PAYMENT</Approval.Header>
        <Box>
          <WarningIcon />
          {Array.isArray(approval) ? (
            <Text width="300px" align="center">
              You are about to approve {approval.length} transactions
            </Text>
          ) : (
            <>
              <Text width="300px" align="center">
                You are about to approve payment for;
              </Text>
              <Text width="300px" align="center">
                <b>ACC NO: {approval?.last_history.account_number}</b>,{' '}
                <b>BANK: {approval?.last_history.bank_name}</b>
              </Text>
              <Text width="300px" align="center">
                <b>PHONE NO: {approval?.phone_number}</b>
              </Text>
            </>
          )}
        </Box>
        <Approval.Buttons>
          <Button
            color="white"
            bg="mediumBue"
            mr="1rem"
            loading={loading}
            onClick={() => handleComplete(Array.isArray(approval) ? approval : approval?.id)}
          >
            Complete Transfer
          </Button>
          <Button color="white" bg="red" onClick={toggleModal}>
            Cancel
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};

export default ApprovalModal;
