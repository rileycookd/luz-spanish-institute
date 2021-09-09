import React, { useState, useEffect } from "react";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'
import { cn } from '../lib/helpers'

import ClassEventList from '../components/ClassEventList'
import ClassDetailList, { ClassDetailListItem } from '../components/ClassDetailList'
import LayoutSidebar from '../components/layout-sidebar'
import Footer from '../components/footer'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as tabStyles from '../components/tab-component.module.css';
import { parseISO } from 'date-fns'
import { AiFillCalendar } from 'react-icons/ai';
import { BsCalendarFill as CalendarIcon } from 'react-icons/bs'
import { RiHistoryFill as HistoryIcon } from 'react-icons/ri'
import { FaCalendarPlus as AddCalendarIcon } from 'react-icons/fa'
import { MdAssignment as HomeworkIcon } from 'react-icons/md'
import { IoPersonCircle as ProfileIcon } from 'react-icons/io5'
import EditUser from "../components/forms/EditUser.js";


import { useSiteSettings } from "../graphql-hooks/SiteSettings";


const Homepage = (props) => {
  const { data, errors } = props;

  const [currentUser, setCurrentUser] = useState({})

  console.log(currentUser)

  const userQuery = `
    *[netlifyId == $id]{
      ...,
      classes[]{
        ...,
        content[]{
          _type != 'resource' => @,
          _type == 'resource' => @->{
            ...
          }
        }    
      }
    }
  `
  
  useEffect(() => {
    fetch(`https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=${userQuery}&$id="${props.user.id}"`)
    .then(response => response.json())
    .then(data => setCurrentUser(data.result[0]))
  }, [])

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
    <Layout navMenuItems={menuItems}>
      <SEO
          title={'Learning resources'}
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <Tabs 
          className={tabStyles.root}
          selectedTabClassName={tabStyles.active}>
          <TabList className={cn(tabStyles.tabList, tabStyles.dark)}>
            <Tab className={cn(tabStyles.tab, tabStyles.dark)}>Classes</Tab>
            <Tab className={cn(tabStyles.tab, tabStyles.dark)}>Resources</Tab>
            <Tab className={cn(tabStyles.tab, tabStyles.dark)}>Account</Tab>
          </TabList>

          <TabPanel>
            <Tabs selectedTabClassName={tabStyles.active}>
              <LayoutSidebar reverse>
                <TabList className={tabStyles.tabListMenu}>
                  <Tab className={tabStyles.tabMenu}>
                    <CalendarIcon /> Upcoming classes
                  </Tab>
                  <Tab className={tabStyles.tabMenu}>
                    <HistoryIcon /> Class history
                  </Tab>
                  <Tab className={tabStyles.tabMenu}>
                    <HomeworkIcon /> Assignments
                  </Tab>
                  <Tab className={tabStyles.tabMenu}>
                    <AddCalendarIcon /> Add classes
                  </Tab>
                </TabList>
                <div>
                  <TabPanel>
                    <ClassEventList>
                      {currentUser?.classes?.filter(c => parseISO(c.start) > new Date())}
                    </ClassEventList>
                  </TabPanel>
                  <TabPanel>
                    <ClassDetailList>
                      {currentUser?.classes?.filter(c => parseISO(c.start) < new Date())}
                    </ClassDetailList>
                  </TabPanel>
                  <TabPanel>
                    Assignments
                  </TabPanel>
                  <TabPanel>
                    Add classes
                  </TabPanel>
                </div>
              </LayoutSidebar>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <h3>Resources</h3>
          </TabPanel>
          
          <TabPanel>
            <Tabs selectedTabClassName={tabStyles.active}>
              <LayoutSidebar reverse>
                <TabList className={tabStyles.tabListMenu}>
                  <Tab className={tabStyles.tabMenu}>
                    <ProfileIcon /> Profile
                  </Tab>
                </TabList>
                <div>
                  <TabPanel>
                    {currentUser?.email ? <EditUser {...currentUser}/> : <div>Loading...</div>}
                  </TabPanel>
                </div>
              </LayoutSidebar>
            </Tabs>
          </TabPanel>

        </Tabs>

      </Container>
      <Footer />
    </Layout>
  );
};

export default Homepage;