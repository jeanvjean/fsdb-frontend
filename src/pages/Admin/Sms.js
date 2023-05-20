import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import styled from '@emotion/styled';
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { H3 } from '../../Components/GlobalStyles';
import { SidebarContext } from '../../context/SidebarContext';

import {
  getAllProgrammesAction
} from '../../redux/actions/dashboard.actions';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from '../../Components/Elements/SelectField';
import { Button, Form, Heading, Text, toastMessage } from '../../Components/Elements';
import { fetchSmsMessageAction, addSmsMessageAction } from '../../redux/actions/sms.action';
import { useHistory } from 'react-router-dom';

export const E = {};

E.FormNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

E.Header = styled.header`
  display: flex;
  padding: 1rem 0;
  margin: 2rem 0;
  justify-content: space-between;
`;

const SmsPage = () => {

  const { state } = useContext(SidebarContext);

  const [payload, setPayload] = useState({})
  const [progId, setProgId] = useState('')
  const [smsID, setSmsID] = useState('')

  const dispatch  = useDispatch()
  const {goBack} = useHistory()

  const getAllProgrammes = useCallback((period) => dispatch(getAllProgrammesAction(period)), [
    dispatch,
  ]);
  const fetchSmsMessage = useCallback((id, params={}) => dispatch(fetchSmsMessageAction(id, params)), [
    dispatch,
  ]);
  const addSmsMessage = useCallback((id, params={}) => dispatch(addSmsMessageAction(id, params)), [
    dispatch,
  ]);      

  const { fetchingProgrammes, programmes, addingSmsMessage, fetchingSmsMessage, message} = useSelector(
    ({ dashboard, smsMessage }) => ({
      fetchingProgrammes: dashboard.fetchingProgrammes,
      programmes: dashboard.programmes,
      addingSmsMessage: smsMessage.addingSmsMessage,
      fetchingSmsMessage: smsMessage.fetchingSmsMessage,
      message: smsMessage.smsMessage,
    })
  );  

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value
    })
  }

  const handleAddSms = async (e) => {
    e.preventDefault()
    const {message_key, message_value} = payload
    if(!message_key || !message_value) return toastMessage({type:"error", message:"Please enter a valid message"})    
    await addSmsMessage(payload.id, {...payload, programme_id: progId})
    toastMessage({type:"success", message:"Message was successfully added." })
  }

  useEffect(() => {
    getAllProgrammes()
  }, [])

  useEffect(async () => {
    try {
      if(payload.message_key){
        if(!progId.length) return toastMessage({type:"error", message:"Please select a Programme"})
        await fetchSmsMessage(progId, {message_key: payload.message_key})
      }      
    } catch (error) {
      toastMessage({type:"error", message: error?.response?.data?.message || "An error occured. Couldn't fetch message" })
      setPayload({
        ...payload,
        message_value: ""
      }) 
    }
  }, [progId, payload.message_key])

  useEffect(() => {
    if(message){
      setPayload({
        ...payload,
        message_value: message.message_value,
        id: message.id
      })
    }
  }, [message])

  return (
    <DashboardLayout state={state}>
      <Heading type="h3" weight="bold">
        SMS
      </Heading>

      <Box width={[1, "25rem"]} mt="3rem">
        <SelectField
          label="Programme"
          onChange={(e) => setProgId(e.target.value)}
          // ref={dateRangeRef}
          loading={fetchingProgrammes}
          id="date-range"
          name="programme"
          flex={0}
          noRadius
          whiteBg
        >
          <option selected defaultChecked disabled>
            Select Programme
          </option>
          {
            programmes.length && programmes.map(p => <option value={p.id}>{p.name}</option>)
          }
        </SelectField>         
      </Box>     

      <Box width={[1, "25rem"]} mt="1rem">
        <SelectField
          label="Message Type"
          onChange={handleChange}
          // ref={dateRangeRef}
          loading={fetchingProgrammes}
          id="date-range"
          name="message_key"
          flex={0}
          noRadius
          whiteBg
        >
          <option selected defaultChecked disabled>
            Select a message type
          </option>

          <option value="registration">Registration</option>      
          <option value="whitelist">Whitelist</option>      
          <option value="resent">Resent</option>
        </SelectField>         
      </Box>

      <Box width={[1, "25rem"]} mt="1rem">
        <Form>
          <Form.Label>Message</Form.Label>
          <Form.Textarea value={payload.message_value} name="message_value" onChange={handleChange}/>
        </Form>
      </Box> 

      {
        fetchingSmsMessage && (
          <Box mt="1rem">
            <span style={{fontSize:'0.8rem'}}>Fetching message...</span>
          </Box>          
        )
      }

        <Flex justifyContent="space-between" width={['15rem']}>
          <Button mt="2rem" style={{width: '45%'}} color="white" bg="mediumBue" loading={addingSmsMessage} onClick={handleAddSms}>
            Save
          </Button>
          <Button  mt="2rem" style={{width: '45%'}} color="white" bg="red" onClick={() => goBack()}>
            Cancel
          </Button>          
        </Flex>           
      
    </DashboardLayout>
  )
}

export default SmsPage
