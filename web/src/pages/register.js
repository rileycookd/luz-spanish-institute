import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import { mapEdgesToNodes } from '../lib/helpers'

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
      timezone
      _rawDescription
      name
      facebook
      linkedin
      instagram
    }

    teachers: allSanityTeacher {
      edges {
        node {
          availability {
            day
            availableTimes {
              _key
              _type
              start
              end
            }
          }
        }
      }
    }

    classTypes: allSanityClassType {
      edges {
        node {
          title
          min
          max
          sizeDiscount
          pricing {
            duration
            price
            _key
            _type
          }
          packages {
            discount
            quantity
            title
            _type
            _key
          }
          order
          maxDiscount
        }
      }
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

  const timezone = (data || {}).company
    ? data.company.timezone
    : "America/Santiago"

  const classTypes = (data || {}).classTypes.edges
    ? mapEdgesToNodes(data.classTypes)
    : []
  classTypes.sort((a, b) => a.order - b.order); 

  const teachers = (data || {}).teachers.edges
    ? mapEdgesToNodes(data.teachers)
    : []

  return (
    <Layout>
      <SEO
          title="Register for classes"
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <FormSlide classTypes={classTypes} timezone={timezone} teachers={teachers} />
      </Container>
    </Layout>
  )
}

export default RegisterPage
