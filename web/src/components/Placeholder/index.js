import React from 'react'
import { useGetCurrentUserQuery } from '../../services/sanityApi'
import { useIdentityContext } from "react-netlify-identity-gotrue"



const Placeholder = (props) => {

  const identity = useIdentityContext()
  const { data, isError, isLoading } = useGetCurrentUserQuery(identity.user.id)


  console.log("DATA: ", data)

  return (
    <div>
      {/* <h3>{data?.species?.name}</h3>
      <img src={data?.sprites?.front_shiny} alt={data?.species?.name} /> */}
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default Placeholder
