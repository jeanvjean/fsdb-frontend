import React from 'react';
import MainModal from './MainModal';
import { Spinner } from '../../Elements/Spinner';
import styled from '@emotion/styled';
import { Button } from '../../Elements';
import { Text } from 'rebass';
import { ModalWrapper } from '../Dropdowns/Styles';
import SelectField from '../../Elements/SelectField';
import { CancelIcon } from './UploadBeneficiariesModal';

const style = {
  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
};

const Action = {};
Action.Header = styled.header`
  font-size: ${(p) => p.theme.fontSizes.normal};
  font-weight: 600;
  ${({ theme, status }) =>
    status === 'danger' ? `color: ${theme.colors.red}` : `color: ${theme.colors.mediumBue}`};
  text-align: center;
`;
Action.Body = styled.form`
  font-size: ${(p) => p.theme.fontSizes.normal};
  font-weight: 400;
  color: ${(p) => p.theme.colors.black};
  text-align: center;
  margin: 1rem 0;
`;
Action.Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
  width: 100%;
`;

const ExportModal = (props) => {
  const {
    header,
    handleProceed,
    toggleModal,
    proceedButtonText,
    status,
    onChange,
    is_loading,
    error,
    setError,
  } = props;

  const handleCancel = () => {
    toggleModal();
    setError({});
  };

  const closeModal = (event) => {
    if (event.target.id === "modalRefWrapper") {
        handleCancel()
    } 
  }

  return (
    <ModalWrapper onClick={closeModal} id="modalRefWrapper" >
      <MainModal style={style} toggleDropdown={() => false} width="450px" padding="2rem">
        <Action.Header status={status}>{header || 'Attention!'}</Action.Header>
        <Action.Body onSubmit={handleProceed}>
          <Text>Are you sure you want to proceed?</Text>
          {/* <SelectField onChange={onChange} label="Select Export Type">
            <option>Select Export Type</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </SelectField> */}
          <div style={{ width: '100%', textAlign: 'left' }}>
            <Text color="red" fontSize="11px">
              {error}
            </Text>
          </div>
          <Action.Buttons>
            <Button mr="1rem" color="white" bg={status === 'danger' ? 'red' : 'mediumBue'} onClick={handleProceed}>
              {is_loading ? <Spinner size="1rem" color="#fff" /> : proceedButtonText || 'Proceed'}
            </Button>
            <Button bg="red" color="white" onClick={handleCancel}>
              Close
            </Button>
          </Action.Buttons>
        </Action.Body>
      </MainModal>
    </ModalWrapper>
  );
};

export default ExportModal;
