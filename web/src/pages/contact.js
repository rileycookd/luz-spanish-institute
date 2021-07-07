import React, { useState } from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'

import ContactBlock from '../components/contact-block'

import Footer from '../components/footer'

export const query = graphql`
  query ContactTemplateQuery {
    company: sanityCompanyInfo {
      phone
      email
      _rawDescription
      name
      facebook
      linkedin
      instagram
    } 

    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      ...SiteSettings
    }
  }
`;

const ContactPage = (props) => {

  const { data, errors } = props;

  console.log(data)

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} /> 
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  
  const menuItems = site.defaultNav && (site.defaultNav._rawItems || []);
  const menuCtas = site.defaultNav && (site.defaultNav._rawCtas || []);


  return (
    <Layout navMenuItems={menuItems} navMenuCtas={menuCtas}>
      <SEO
          title="Contact us"
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <ContactBlock />
      </Container>
    </Layout>
  );
};

export default ContactPage;