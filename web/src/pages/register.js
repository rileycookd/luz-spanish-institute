import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import { mapEdgesToNodes } from '../lib/helpers'

import Layout from '../containers/layout'
import SEO from '../components/seo'
import Container from '../components/container'
import RegisterUser from '../components/forms/RegisterUser'


export const query = graphql`
  query RegisterPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      ...SiteSettings
    }

    company: sanityCompanyInfo {
      ...CompanyInfo
    }
  }    
`

const RegisterPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  
  const site = (data || {}).site
  // const company = (data || {}).company

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  // const menuItems = site._rawDefaultNav && (site._rawDefaultNav.items || []);
  // const menuCtas = site._rawDefaultNav && (site._rawDefaultNav.ctas || []);

  // const timezone = (data || {}).company
  //   ? data.company.timezone
  //   : "America/Santiago"

  // const classTypes = (data || {}).classTypes.edges
  //   ? mapEdgesToNodes(data.classTypes)
  //   : []
  // classTypes.sort((a, b) => a.order - b.order); 

  // const teachers = (data || {}).teachers.edges
  //   ? mapEdgesToNodes(data.teachers)
  //   : []

    
  

  return (
    <Layout>
      <SEO
          title="Sign up for Amelio Language Institute"
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <RegisterUser />
      </Container>
    </Layout>
  )
}

export default RegisterPage
