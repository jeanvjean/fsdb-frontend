import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button, Text, WarningIcon } from '../../Elements';
import { Approval, Box } from './ApprovalModal';

export const SmsActionModal = (props) => {
  const { toggleModal, heading, text, handleProceed } = props;
  return (
    <ModalWrapper>
      <MainModal toggleDropdown={() => {}} width="500px" padding="0">
        <Approval.Header>{heading}</Approval.Header>
        <Box>
          <WarningIcon fill="#99cc33" />
          <Text width="300px" align="center">
            {text}
          </Text>
        </Box>
        <Approval.Buttons>
          <Button
            color="white"
            bg="mediumBue"
            mr="1rem"
            onClick={handleProceed}
            loading={props.loading}
          >
            Proceed
          </Button>
          <Button color="white" bg="red" onClick={toggleModal}>
            Cancel
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};
