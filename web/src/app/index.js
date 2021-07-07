import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
// import Profile from "./profile"
// import Main from "./main"
import Login from "./login"
import { useIdentityContext } from "react-netlify-identity-widget"
import { navigate } from "gatsby"

function PrivateRoute(props) {
  const { isLoggedIn } = useIdentityContext()
  const { component: Component, location, ...rest } = props

  React.useEffect(
    () => {
      if (!isLoggedIn && location.pathname !== `/app/login`) {
        // If the user is not logged in, redirect to the login page.
        navigate(`/app/login`)
      }
    },
    [isLoggedIn, location]
  )
  return isLoggedIn ? <Component {...rest} /> : null
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default function App() {
  return (
    <Layout>
      <Navbar />
      <Router>
        {/* <PrivateRoute path="/app/profile" component={Profile} /> */}
        <PublicRoute path="/app">
          {/* <PrivateRoute path="/" component={Main} /> */}
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  )
}