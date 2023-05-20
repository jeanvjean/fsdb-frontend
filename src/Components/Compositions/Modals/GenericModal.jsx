/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import { Approval, Box } from './ApprovalModal';

export const modalShadow = {
  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
};

const SucessModal = ({title, children }) => {
  return (
    <ModalWrapper>
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
        <Approval.Header>{title}</Approval.Header>
        {children}
      </MainModal>
    </ModalWrapper>
  );
};

export default SucessModal;
