/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import styled from '@emotion/styled';
import { Button, FormInput } from '../../Elements';
import { CheckmarkCircle } from '../../Elements/Icons';
import { Approval, Box } from './ApprovalModal';
import DatePicker from '../DatePicker';
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

const SucessModal = (props) => {
  const [state, setState] = useState({
    fundingBand: {
      minAmount: 0,
      maxAmount: 0,
    },
  });
  const { close, handleAddFunding, fundingAdded, loading } = props;

  useEffect(() => {
    setState({ ...state });
  }, []);

  const handleClose = async () => {
    close();
  };

  const closeModal = (event) => {
    if (event.target.id === "modalRefWrapper") {
        close()
    } 
  }

  return (
    <ModalWrapper onClick={closeModal} id="modalRefWrapper">
      <MainModal style={modalShadow} toggleDropdown={() => {}} width="500px" padding="0">
      <CancelIcon src="/cancel-icon.svg" alt="cancel" onClick={handleClose } style={{bottom: "8px"}} />
        <Approval.Header>ADD FUNDING BAND</Approval.Header>
        <FormWrapper>
          {fundingAdded ? (
            <CheckmarkCircle />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <FormInput
                onChange={(e) =>
                  setState((s) => ({
                    fundingBand: {
                      ...s.fundingBand,
                      amount: e.target.value,
                    },
                  }))
                }
                type="number"
                name="bandAmount"
                placeholder="New funding band amount"
                error={''}
              />
            </div>
          )}
        </FormWrapper>

        <Approval.Buttons>
          <Button
            color="white"
            bg="mediumBue"
            onClick={() => handleAddFunding(state.fundingBand)}
            mr="1rem"
            loading={loading}
          >
            Add Funding Band
          </Button>
          <Button color="white" bg="red" onClick={handleClose}>
            Close
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};

export default SucessModal;
