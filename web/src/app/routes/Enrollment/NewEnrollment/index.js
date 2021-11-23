import React from 'react'
import AddRegistration from '../../../../components/forms/AddRegistration'
import { StudentAppHeader } from '../../../../components/Layout/index.js'

const NewEnrollment = (props) => {

  return (
    <div>
      <StudentAppHeader title=" " />
      <AddRegistration />
    </div>
  )
}

export default NewEnrollment