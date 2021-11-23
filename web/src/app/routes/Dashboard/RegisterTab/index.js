import React from 'react'
import { Router, Redirect } from '@reach/router';
import AddRegistration from "../../../../components/forms/AddRegistration"
import RegistrationList from './RegistrationList'
import Loading from '../../../../components/Loading';
import { useUserContext } from "../../../../contexts/UserContext"

const RegisterTab = () => {

  const { data, isLoading } = useUserContext();


  return (

      <Router>    
        <RegistrationList path="/" />
        <AddRegistration path="/new/*" {...data} isLoading={isLoading} />
        {/* {!isLoading ? <EditUser path="/" {...data}/> : <Loading path="/" />} */}
      </Router>

  )
}

export default RegisterTab