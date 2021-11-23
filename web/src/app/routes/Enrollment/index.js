import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router"
import ShowEnrollments from "./ShowEnrollments";
import EditEnrollment from "./EditEnrollment";
import NewEnrollment from "./NewEnrollment";


const Dashboard = (props) => {

  return (
    <Router>
      <ShowEnrollments path="/" />
      <NewEnrollment path="/new/*" />
      <EditEnrollment path="/:id" />
    </Router> 
  );
};

export default Dashboard;