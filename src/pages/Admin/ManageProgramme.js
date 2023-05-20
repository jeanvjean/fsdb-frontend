import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import styled from '@emotion/styled';
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { SidebarContext } from '../../context/SidebarContext';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Heading, Text, toastMessage, TrashIcon } from '../../Components/Elements';
import { useHistory } from 'react-router-dom';
import ManageProgrammesTable from '../../Components/Compositions/Tables/ManageProgrammesTable';
import { getAllProgrammesAction, createProgrammeAction,deleteProgrammeAction, editProgrammeAction} from '../../redux/actions/dashboard.actions';
import { Spinner } from '../../Components/Elements/Spinner';
import { toast } from 'react-toastify';

const EntriesTrashIcon = styled(TrashIcon)`
  margin-top: -3px;
  // margin-right: 5px;
  width: 1rem;
  fill: #fff;
`;

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

const ManageProgramme = () => {

  const { state } = useContext(SidebarContext);

  const [payload, setPayload] = useState({})
  const [editMode, setEditMode] = useState(false)

  const dispatch  = useDispatch()
  const {goBack} = useHistory()

  const columns =  [
    { accessor: 'name', Header: 'Name' },
    { 
      accessor: 'active', 
      Header: 'Status', 
      Cell: ({ value }) => value ? 'Active' : 'In-Active',
    },
    { 
      accessor: 'flagging_duration', 
      Header: 'Flagging Duration', 
      Cell: ({ value }) => value ? value : 'N/A',
    },    
    { 
      accessor: 'actions', 
      Header: 'Actions', 
      Cell: ({handleEdit, row}) => (
      <Flex>
        <Button onClick={() => handleEdit(row.original.id)} color="white"  bg="5ECBE3">Edit</Button>
      </Flex>
    )},
  ]

  const getAllProgrammes = useCallback(() => dispatch(getAllProgrammesAction()), [dispatch])
  const createProgramme = useCallback((payload) => dispatch(createProgrammeAction(payload)), [dispatch])
  const deleteProgramme = useCallback((id) => dispatch(deleteProgrammeAction(id)), [dispatch])
  const editProgramme = useCallback((id, payload) => dispatch(editProgrammeAction(id, payload)), [dispatch])

  const { programmes, fetchingProgrammes, creatingProgramme, deletingProgramme, editingProgramme} = useSelector(
    ({ dashboard }) => ({
      programmes: dashboard.programmes,
      fetchingProgrammes: dashboard.fetchingProgrammes,
      creatingProgramme: dashboard.creatingProgramme,
      deletingProgramme: dashboard.deletingProgramme,
      editingProgramme: dashboard.editingProgramme
    })
  );  

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateProgramme = async (e) => {
    try {
      e.preventDefault()
      const {name, flagging_duration} = payload

      if(!name) return toastMessage({type:"error", message:"Please enter a valid name."})
      if(!flagging_duration) return toastMessage({type:"error", message:"Please enter a Flagged Transactions."})

      await createProgramme(payload)
      getAllProgrammes()
      toastMessage({type:"success", message:"Programme was successfully added." })      
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }
  }

  const handleEdit = (id) => {
   setEditMode(true)
   setPayload({
     ...programmes.find(p => p.id == id)
   })
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setPayload({
      name:""
    })
   }  

   const handleDelete = async () => {
    try {
      await deleteProgramme(payload.id)
      setPayload({})
      getAllProgrammes()
      setEditMode(false)
      toastMessage({type:"success", message:"Programme was successfully deleted." })      
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }
   }

   const handleEditing = async (e) => {
    try {
      e.preventDefault()
      const {name} = payload
      if(!name) return toastMessage({type:"error", message:"Please enter a valid name"})    
      await editProgramme(payload.id, {name: payload.name, flagging_duration: payload.flagging_duration})
      getAllProgrammes()
      toastMessage({type:"success", message:"Programme was successfully edited." })
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Internal Server Error')
    }
  }


  useEffect(() => {
    getAllProgrammes()
  }, [])




  return (
    <DashboardLayout state={state}>
      <Heading type="h3" weight="bold">
        Manage Programmes
      </Heading>

      <Box width={[1, "25rem"]} mt="1rem">
        <Form onSubmit={handleCreateProgramme}>
          <Box>
            <Form.Label>Name</Form.Label>  
            <Form.Input value={payload.name || ""} onChange={handleChange} name="name" placeholder="Enter Programme Name" />             
          </Box>
          <Box mt="1rem">
            <Form.Label>Flagging Duration</Form.Label>  
            <Form.Input type="number" value={payload.flagging_duration || ""} onChange={handleChange} name="flagging_duration" placeholder="Enter Flagging Duration" />             
          </Box>          
        </Form>       
      </Box>


        <Flex justifyContent="space-between" width={editMode ? ['15rem'] : ['12rem']}>

          {
            !editMode && (
              <>
                <Button mt="2rem" loading={creatingProgramme}  color="white" bg="mediumBue" onClick={handleCreateProgramme}>
                  Create
                </Button> 
            
                <Button  mt="2rem"  color="white" bg="red" onClick={() => goBack()}>
                  Cancel
                </Button>                
              </>   
            )
          }

          {
            editMode && (
              <>
                <Button mt="2rem"  color="white" bg="mediumBue" loading={editingProgramme} onClick={handleEditing}>
                  Save
                </Button>
    
                <Button loading={deletingProgramme} mt="2rem"  color="white" bg="red" onClick={handleDelete} >
                  {
                    deletingProgramme && (
                      <Spinner color="white" size="1rem" />
                    )
                  }

                  {
                    !deletingProgramme &&(
                      <EntriesTrashIcon />
                    )
                  }

                </Button>          
    
                <Button  mt="2rem"  color="white" bg="red" onClick={handleCancelEdit}>
                  Cancel
                </Button>              
              </> 
            )
          }



        </Flex>     

      <Box>
        <ManageProgrammesTable
        loading={fetchingProgrammes}
        columns={columns}
        data={programmes}
        actions={{
          handleEdit,
        }}
        />
      </Box>      
      
    </DashboardLayout>
  )
}

export default ManageProgramme
