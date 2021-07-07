import React from "react"
import { navigate } from "gatsby"

import { IdentityModal } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS

export default function Login() {
  const [dialog, setDialog] = React.useState(false)
  return (
    <div>
      <h1>Log in</h1>
      <button onClick={() => setDialog(true)}>log in</button>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={user => navigate("/app/profile")}
        onSignup={user => navigate("/app/profile")}
      />
    </div>
  )
}