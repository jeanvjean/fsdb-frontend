/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button, Text, CheckmarkCircle } from '../../Elements';
import { Approval, Box } from './ApprovalModal';

export const modalShadow = {
  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
};

const initialState = {
  ids: [],
};

const SucessModal = (props) => {
  const [state, setState] = useState(initialState);
  const { close, heading } = props;

  useEffect(() => {
    setState({ ...state });
  }, []);

  const handleClose = async () => {
    close();
  };

  return (
    <ModalWrapper>
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
        <Approval.Header>{heading}</Approval.Header>
        <Box>
          <CheckmarkCircle />
          <Text width="300px" align="center">
            Out of {props.payload.totalTrans}
          </Text>
          <Text color="green4" align="center">
            {props.payload.approvedTrans}
          </Text>
          <Text color="red2" align="center">
            {props.payload.rejectedTrans}
          </Text>
        </Box>

        <Approval.Buttons>
          <Button color="white" bg="mediumBue" onClick={handleClose}>
            Close
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};

export default SucessModal;
