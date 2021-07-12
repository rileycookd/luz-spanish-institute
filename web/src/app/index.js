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
  const { isLoggedIn } = useIdentityContext()
  const { component: Component, location, ...rest } = props

  console.log(isLoggedIn)
  
  React.useEffect(
    () => {
      if (!isLoggedIn && location.pathname !== `/login`) {
        // If the user is not logged in, redirect to the login page.
        navigate(`/login`)
      }
    },
    [isLoggedIn, location]
  )
  return isLoggedIn ? <Component {...rest} /> : null
}

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default function App(props) {

  const { isLoggedIn } = useIdentityContext()
  const { location } = props

  useEffect(
    () => {
      if (!isLoggedIn && location.pathname !== `/login`) {
        // If the user is not logged in, redirect to the login page.
        navigate(`/login`)
      }
    },
    [isLoggedIn, location]
  )

  return (
    <>
      {isLoggedIn && (
        <Layout>
          <Navbar />
          <Router>
            <PrivateRoute path="/app">
              <PrivateRoute path="/" component={Homepage} />
            </PrivateRoute>
          </Router>
        </Layout>
      )}
    </>
  )
}