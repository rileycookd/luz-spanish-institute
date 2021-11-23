import { graphql, StaticQuery } from 'gatsby'
import React from 'react'

import '../styles/layout.css'
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/700.css"

import Layout from '../components/layout'

function LayoutContainer (props) {
 
  return (
    <StaticQuery
      query = {graphql`
        query SiteInfoQuery {
          site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
            title
          }
      
          company: sanityCompanyInfo {
            phone
            email
            _rawDescription
            name
            linkedin
            instagram
            facebook
          }
        }
      `}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          )
        }
        if (!data.company) {
          throw new Error(
            'Missing "company info". Open the studio at http://localhost:3333 and add "company info" data'
          )
        }
        return (
          <Layout
            {...props}
            company={data.company}
            siteTitle={data.site.title}
          />
        )
      }}
    />
  )
}

export default LayoutContainer
