import React, { useEffect } from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import Homepage from "./homepage"
// import Main from "./main"
import Login from "./login"
import { useIdentityContext } from "react-netlify-identity-gotrue"
import { navigate } from "gatsby"

function PrivateRoute(props) {
  const identity = useIdentityContext()
  const { component: Component, location, ...rest } = props
  
  React.useEffect(
    () => {
      if (!identity.user && location.pathname !== `/login`) {
        // If the user is not logged in, redirect to the login page.
        navigate(`/login`)
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

  useEffect(
    () => {
      if (!identity.user && location.pathname !== `/login`) {
        // If the user is not logged in, redirect to the login page.
        navigate(`/login`)
      }
    },
    [identity.user, location]
  )

  return (
    <>
      {identity && (
        <Router basepath="/app">
          <PrivateRoute path="/" component={Homepage} />
        </Router>
      )}
    </>
  )
}