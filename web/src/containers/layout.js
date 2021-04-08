import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../components/layout'

function LayoutContainer (props) {
  const [showNav, setShowNav] = useState(false)
  function handleShowNav () {
    setShowNav(true)
  }
  function handleHideNav () {
    setShowNav(false)
  }
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
            showNav={showNav}
            company={data.company}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
          />
        )
      }}
    />
  )
}

export default LayoutContainer
