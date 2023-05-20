import React, { useContext, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AddRep } from '../../Components/Compositions/Forms/AddRep';
import { Heading } from '../../Components/Elements';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import { createUserAction, viewUserAction, editUserAction, detachProgrammeAction } from '../../redux/actions/users.actions';

const AddRepPage = ({match}) => {

  const [isEdit, setIsEdit] = useState(false)
  
  const { state } = useContext(SidebarContext);
  const dispatch = useDispatch();

  const createUser = useCallback((payload) => dispatch(createUserAction(payload)), [dispatch]);
  const getSingleUser = useCallback((id, params={}) => dispatch(viewUserAction(id, params)), [dispatch]);
  const editAUserAction = useCallback((id, payload={}) => dispatch(editUserAction(id, payload)), [dispatch]);
  const detachProgramme = useCallback((id, payload={}) => dispatch(detachProgrammeAction(id)), [dispatch]);

  useEffect(() => {
    if(match.params.id) {
      setIsEdit(true)
      getSingleUser(match.params.id)
    }
  }, [match.params.id])

  return (
    <DashboardLayout state={state}>
      <Heading type="h3" weight="bold">
        {isEdit ? 'Edit' : 'Add'} User
      </Heading>
      <AddRep createUser={createUser} getSingleUser={getSingleUser} match={match} isEdit={isEdit} editUserAction={editAUserAction} userId={match.params.id} detachProgramme={detachProgramme}/>
    </DashboardLayout>
  );
};

const Page = ({match}) => (
  <SidebarProvider>
    <AddRepPage match={match}/>
  </SidebarProvider>
);

export default withRouter(Page);
