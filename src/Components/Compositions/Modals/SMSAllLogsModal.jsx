import React, { useCallback, useEffect, useState } from 'react';
import { ModalWrapper } from './Styles';
import MainModal from './MainModal';
import { Button, Form, Text, WarningIcon } from '../../Elements';
import { Approval } from './ApprovalModal';
import { Box, Flex } from 'rebass';
import { DateRange } from '../DateRangePicker/DateRange';
import { CancelIcon } from './UploadBeneficiariesModal';

export const SMSAllLogsModal = (props) => {

  const { 
    toggleModal, 
    heading, 
    dates, 
    handleDateChange,
    handleCloseModal,
    payload,
    setPayload
  } = props;

  const closeModal = (event) => {
    if (event.target.id === "modalRefWrapper") {
        handleCloseModal()
    } 
  }

  return (
    <ModalWrapper onClick={closeModal} id="modalRefWrapper" >
      <MainModal toggleDropdown={() => {}} width="500px" padding="0">
      <CancelIcon src="/cancel-icon.svg" alt="cancel" onClick={handleCloseModal } style={{bottom: "8px"}} />
        <Approval.Header>{heading}</Approval.Header>
        <Box p="2rem" minHeight="10rem" width={["20rem"]}>
          <Form>
            <Box>
              <Form.Label>Filter</Form.Label>
              <Form.Select onChange={(e) => setPayload({
                ...payload,
                sms_type:e.target.value
              })}>
                <option selected disabled>Please select an action</option>
                <option selected={payload.sms_type === 'incoming'} value="incoming">Incoming</option>
                <option selected={payload.sms_type === 'outgoing'} value="outgoing">Outgoing</option>
              </Form.Select>
            </Box>

            <Box mt="2rem">
              <Form.Label>Date</Form.Label>
              <DateRange value={dates} handleDateChange={handleDateChange} />
            </Box>  
          </Form>
        </Box> 

        <Approval.Buttons>
          {/* <Button
            color="white"
            bg="mediumBue"
            mr="1rem"
            onClick={handleFilter}
            loading={props.loading}
          >
            Proceed
          </Button> */}
          <Button color="white" bg="red" onClick={handleCloseModal}>
            Close
          </Button>
        </Approval.Buttons>
      </MainModal>
    </ModalWrapper>
  );
};

SMSAllLogsModal.defaultProps = {
  heading:"Filter Message",
  text:"Text Message",
  dates: null,
  handleDateChange: () => null,
  filterType:""
}
