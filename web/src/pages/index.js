import React from 'react'
import { graphql } from 'gatsby'

import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../containers/layout'
import Page from '../templates/page'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      ...SiteSettings
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

    page: sanityPage(_id: { regex: "/(drafts.|)homepage/" }) {
      ...PageInfo
    }
  }    
`


const IndexPage = props => {
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

  return (
    <Page data={data} pathname={props.location.pathname} />
  )
}

export default IndexPage
