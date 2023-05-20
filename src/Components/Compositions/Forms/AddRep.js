import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Flex } from 'rebass';
import { utils } from '../../../api/utils';
import { useUser } from '../../../hooks/useUser';
import { activateUserAction, deActivateUserAction } from '../../../redux/actions/auth.actions';
import { Form, Button, toastMessage } from '../../Elements';
import { Box } from '../../Elements/Box';
import MultiselectForm from '../Multiselect';
import { ROLES } from '../Sidebar/sidebarData';
import { validateRep } from './utils';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const initialRep = {
  values: {
    user_type: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    programmes: []
  },
  errors: {
    user_type: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  },
};

const mapStateToProps= ({users, auth}) =>{
  return {
    loadingAUser: users.loadingAUser,
    aUser: users.aUser,
    activatingUser: auth.activatingUser,
  }
}

export const AddRep = ({ createUser, isEdit, editUserAction, userId, detachProgramme }) => {
  const [rep, setRep] = useState(initialRep);
  const [loading, setLoading] = useState(false);
  const [programmes, setProgrammes] = useState([])

  const { errors, values } = rep;

  const {loadingAUser,  aUser,activatingUser} = useSelector(mapStateToProps)

  const dispatch = useDispatch()
  const {push, goBack} = useHistory()
  const {role} = useUser()

  const activateUser = useCallback((id) => dispatch(activateUserAction(id)), [dispatch])
  const deActivateUser = useCallback((id) => dispatch(deActivateUserAction(id)), [dispatch])


  const fetchAllProgrammes = async () => {
    try {
      setProgrammes([])
      const res = await utils.fetchAllProgrammes()
      setProgrammes(res.data)
    } catch (error) {
      toast.error(error.message || "Couldn't fetch programmes.")
    }
  } 

  const handleChange = (e) => {
    e.persist();
    setRep((prevRep) => ({
      ...prevRep,
      values: {
        ...prevRep.values,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const validate = () => {
    const { errors } = validateRep(rep);
    for (let key in errors) {
      if (errors[key]) {
        setRep((prev) => ({ ...prev, errors }));
        return false;
      }
    }
    setRep((prevState) => ({
      ...prevState,
      errors: initialRep.errors,
    }));
    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        await createUser(rep.values);
        setLoading(false);
        setRep((s) => ({
          ...s,
          values: initialRep.values,
        }));
        toastMessage({ type: 'success', message: 'Invitation sent successfully' });
      } catch (error) {
        setLoading(false);
        toastMessage({ type: 'error', message: error.response.data.message });
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const isValid = validate();    
    if(isValid){
      try {
        await editUserAction(userId, rep.values)
        toastMessage({ type: 'success', message: 'User successfully updated.' });
        push(`/dashboard/settings/manage-users`)
      } catch (error) {
        toast.error(error.message || 'Something went wrong')
      }      
    }
  } 

const removeItem = (removedItem) => {
  setRep({
    ...rep,
    values: {
      ...rep.values,
      programmes: values.programmes.filter(prog => prog.id !== removedItem.id)
    }
  }) 
}

const addItem = () => {
  setRep({
    ...rep,
    values: {
      ...rep.values,
      programmes: [...values.programmes]
    }
  })    
}

  const onMultiSelect = (selectedList, selectedItem) => {
    setRep({
      ...rep,
      values: {
        ...rep.values,
        programmes: [...values.programmes, {id: selectedItem.id, name: selectedItem.name}]
      }
    })
  }

  const handleActivate=async  (e) => {
    try {
      e.preventDefault()
      const {deactivate} = rep.values
  
      if(!deactivate){
        await deActivateUser(userId)
        setRep({
          ...rep,
          values: {
            ...rep.values,
            deactivate: true
          }
        })      
        toastMessage({ type: 'success', message: 'User Successfully de-activated.' });    
      }else{
        await activateUser(userId)
        setRep({
          ...rep,
          values: {
            ...rep.values,
            deactivate: false
          }
        })         
        toastMessage({ type: 'success', message: 'User Successfully activated.' }); 
      }      
    } catch (error) {
      toast.error(error?.response?.data.message || 'Internal Server Error')
    }
  }

  const onRemoveSelect = async (selectedList, removedItem) => {
    try {
    // setProgrammesTobeAdded([...programmesTobeAdded.filter(prog => prog.id !== removedItem.id)])
      if(removedItem.attachment_id){
        toastMessage({ type: "info", message: 'Detaching Programme' });
        removeItem(removedItem)
        await detachProgramme(removedItem.attachment_id)

        toastMessage({ type: 'success', message: 'Programme Successfully detached.' });      
      }else{
        removeItem(removedItem) 
      }
    } catch (error) {
      toastMessage({ type: 'error', message: "Couldn't detach programme." }); 
      addItem()    
    }
  }

  useEffect(() => {
    if(Object.keys(aUser).length && isEdit){
      setRep({
        ...rep,
        values: {
          ...rep.values,
          ...aUser
        }
      })
    }

    if(isEdit || role === ROLES.ADMIN){
      fetchAllProgrammes()
    }
    
  }, [isEdit, aUser])


  return (
    <Form>
      <Grid width="70%" mt="4rem">
        <Form.Select
          name="user_type"
          onChange={handleChange}
          label="User Type"
          error={errors.user_type}
          whitBg
          disabled={isEdit}
        >
          <option value="">Select User Type</option>
          <option selected={aUser.user_type ==='administrator'} value="administrator">Administrator</option>
          <option selected={aUser.user_type ==='representative'} value="representative">Representative</option>
          <option selected={aUser.user_type ==='partner'} value="partner">Partner</option>
        </Form.Select>
        <Form.Input
          onChange={handleChange}
          label="Email Address"
          placeholder="Enter Email Address"
          whitBg
          error={errors.email}
          name="email"
          value={rep.values.email}
          disabled={isEdit}
        />
        <Form.Input
          onChange={handleChange}
          label="First Name"
          placeholder="Enter First Name"
          name="first_name"
          error={errors.first_name}
          whitBg
          value={rep.values.first_name}
        />
        <Form.Input
          onChange={handleChange}
          label="Last Name"
          name="last_name"
          placeholder="Enter Last Name"
          error={errors.last_name}
          value={rep.values.last_name}
          whitBg
        />
        <Form.Input
          onChange={handleChange}
          label="Phone Number"
          name="phone_number"
          placeholder="Enter Phone Number"
          error={errors.phone_number}
          value={rep.values.phone_number}
          whitBg
        />
      </Grid>
      {
        (rep.values.user_type === 'partner' || isEdit) && (
          <Box width={["30rem"]} mt="1rem">
            <Form.Label>Select Programme</Form.Label>
            <MultiselectForm options={programmes} onSelect={onMultiSelect} onRemove={onRemoveSelect} selectedValues={rep.values.programmes}/>
          </Box>
        )
      }

        <Flex justifyContent="space-between" maxWidth={isEdit ? ['20rem'] : ['13rem']}>
          <Button mt="2rem" color="white" bg="mediumBue" onClick={isEdit ? handleEdit : handleCreate} loading={loading}>
            {isEdit ? 'Save' : 'Create User'}
          </Button>
          {
            isEdit && (
              <Button mt="2rem" color="white" bg={!rep.values.deactivate ? "red" : "5ECBE3"} onClick={handleActivate} loading={activatingUser}>
              {rep.values.deactivate ? "Activate" : "Deactivate"}
            </Button>              
            )
          }
          <Button  mt="2rem" color="white" bg="red" onClick={(e) => {
            e.preventDefault()
            goBack()
          }}>
            Cancel
          </Button>          
        </Flex>
    </Form>
  );
};
