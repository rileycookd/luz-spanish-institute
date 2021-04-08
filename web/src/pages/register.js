import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'

import Layout from '../containers/layout'
import SEO from '../components/seo'
import Footer from '../components/footer'
import Container from '../components/container'
import FormSlide from '../components/form-slide'


export const query = graphql`
  query RegisterPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      _rawDefaultNav(resolveReferences: {maxDepth: 10})
    }

    company: sanityCompanyInfo {
      phone
      email
      _rawDescription
      name
      facebook
      linkedin
      instagram
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

  const menuItems = site._rawDefaultNav && (site._rawDefaultNav.items || []);
  const menuCtas = site._rawDefaultNav && (site._rawDefaultNav.ctas || []);

  return (
    <Layout navMenuItems={menuItems} navMenuCtas={menuCtas}>
      <SEO
          title="Register for classes"
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <FormSlide />
      </Container>
    </Layout>
  )
}

export default RegisterPage
