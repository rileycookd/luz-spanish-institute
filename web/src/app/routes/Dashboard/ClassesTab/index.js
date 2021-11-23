import React, { useState, useEffect } from 'react'
import { Router, Redirect } from '@reach/router'

import ClassEventList from '../../../../components/ClassEventList'
import ClassDetailList, { ClassDetailListItem } from '../../../../components/ClassDetailList'

import Loading from '../../../../components/Loading'
import AddClasses from '../../../../components/forms/AddClasses'


const ClassesTab = () => {

  return (

  
    <Router>    
      <Redirect 
        noThrow
        from="/"
        to="upcoming"
      /> 

      <ClassEventList path="upcoming" />
      <ClassDetailList path="history" />
    
      
      <Loading path="homework">
        Assignments
      </Loading>
      <AddClasses path="add" />
    </Router>
  )
}

export default ClassesTab