import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'

import Layout from '../containers/layout'
import SEO from '../components/seo'
import Container from '../components/container'
import LoginUser from '../components/forms/LoginUser'


export const query = graphql`
  query LoginPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      ...SiteSettings
    }

    company: sanityCompanyInfo {
      ...CompanyInfo
    }
  }    
`

const LoginPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  
  const site = (data || {}).site

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
          title="Sign up for Amelio Language Institute"
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <LoginUser />
      </Container>
    </Layout>
  )
}

export default LoginPage
