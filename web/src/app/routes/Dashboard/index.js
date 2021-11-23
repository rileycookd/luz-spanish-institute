import React, { useState, useEffect } from "react";

import GraphQLErrorList from "../../../components/graphql-error-list";
import SEO from "../../../components/seo";
import { DashboardLayout } from '../../../components/Layout/index.js'
import Container from '../../../components/container'
import { Router, Redirect } from '@reach/router'

import Footer from '../../../components/footer'
import ClassesTab from './ClassesTab'
import { TabLinkList, TabLink } from "../../../components/TabLinkList";
import AccountTab from "./AccountTab";
import ResourcesTab from "./ResourcesTab";
import RegisterTab from "./RegisterTab";
import { MenuTabList, MenuTab, MenuLink } from "../../../components/MenuTabList";
import LayoutSidebar from "../../../components/layout-sidebar";

import { SidebarNav, SidebarLink } from "../../../components/navigation/SidebarNav";

import { useSiteSettings } from "../../../graphql-hooks/SiteSettings";

const Dashboard = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} /> 
      </Layout>
    );
  }

  const site = useSiteSettings()

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const menuItems = site && (site.defaultNav._rawItems || []);

  return (
    <DashboardLayout path="/">
      <SEO
        title={'Dashboard'}
        description={site.description}
        keywords={site.keywords}
      />                
    </DashboardLayout> 
  );
};

export default Dashboard;