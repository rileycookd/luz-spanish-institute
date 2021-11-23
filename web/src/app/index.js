import React, { useEffect } from "react"
import { Router, Redirect } from "@reach/router"
import Dashboard from "./routes/Dashboard"
import { useIdentityContext } from "react-netlify-identity-gotrue"
import { navigate } from "gatsby"

import Enrollment from './routes/Enrollment'
import { StudentAppLayout } from "../components/Layout/index.js"

function PrivateRoute(props) {
  const identity = useIdentityContext()
  const { component: Component, location, ...rest } = props
  
  React.useEffect(
    () => {
      if (!identity.user && location.pathname !== `/login`) {
        // If the user is not logged in, redirect to the login page.
        // navigate(`/login`)
      }
    },
    [identity.user, location]
  )
  return identity.user ? <Component user={identity.user} {...rest} /> : null
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default function App(props) {

  const identity = useIdentityContext()
  const { location } = props

  // useEffect(
  //   () => {
  //     if (!identity.user && location.pathname !== `/login`) {
  //       // If the user is not logged in, redirect to the login page.
  //       navigate(`/login`)
  //     }
  //   },
  //   [identity.user, location]
  // )

  // const user = useSelector((state) => state.user.value)

  // alert(user.name)

  return (
    <>
      {identity && (
        <Router basepath="/app">
          <PrivateRoute path="/" component={StudentAppLayout}>
            <PrivateRoute path="/" component={Dashboard} />
            <PrivateRoute path="/enrollment/*" component={Enrollment} />
          </PrivateRoute>
         
        </Router>
      )}
    </>
  )
}