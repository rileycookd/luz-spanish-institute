import React from 'react'
import { IoPersonCircle as ProfileIcon } from 'react-icons/io5'
import { Router, Redirect } from '@reach/router';
import EditUser from "../../../../components/forms/EditUser.js/index.js";
import LayoutSidebar from '../../../../components/layout-sidebar'
import { MenuLink, MenuTabList } from '../../../../components/MenuTabList';
import Loading from '../../../../components/Loading';
import { useUserContext } from "../../../../contexts/UserContext"

const AccountTab = () => {

  const { data, isLoading } = useUserContext();


  return (

      <Router>    
        <Redirect 
          noThrow
          from="/"
          to="profile"
        />  
        {!isLoading ? <EditUser path="profile" {...data}/> : <Loading path="profile" />}
      </Router>

  )
}

export default AccountTab