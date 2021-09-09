import React from "react";
import { graphql } from "gatsby";

import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'

import PageHeader from '../components/page-header'

import LayoutSidebar from '../components/layout-sidebar'
import Footer from '../components/footer'
import ClassOverview from "../domain/classes/ClassOverview";
import CtaForm from '../components/cta-form'

export const query = graphql`
  query ClassTypeTemplateQuery($id: String!) {
    classType: sanityClassType(id: { eq: $id }) {
      slug {
        current
      }
      image {
        ...SanityImage
      }
      _id
      _rawDescription
      title
      pricing {
        price
        duration
        _key
      }
      packages {
        _key
        discount
        quantity
        title
      }
      min
      max
      maxDiscount
      sizeDiscount
      testimonial {
        _type
        student {
          name
          city
          country
          image {
            ...SanityImage
          }
        }
        quote
      }
      faq {
        _rawQuestions(resolveReferences: {maxDepth: 10})
      }
    }

    classTypes: allSanityClassType {
      edges {
        node {
          _id
          slug {
            current
          }
          title
          order
        }
      }
    }

    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      _rawDefaultNav(resolveReferences: {maxDepth: 10})
    }
  }
`;

// openGraph {
//     title
//     description
//     image {
//       ...SanityImage
//     }
//   }

const ClassType = (props) => {
  const { data, errors } = props;

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

  const navMenu = (data || {}).navMenu;
  const menuItems = site && (site._rawDefaultNav.items || []);
  const menuCtas = site && (site._rawDefaultNav.ctas || []);

  const classType = (data || {}).classType;
  const { subtitle, image, _rawDescription } = classType;
  const pageTitle = classType && classType.title;

  
  const classTypes = (data || {}).classTypes.edges
    ? mapEdgesToNodes(data.classTypes).filter(filterOutDocsWithoutSlugs)
    : []
  classTypes.sort((a, b) => a.order - b.order); 

  return (
    <Layout navMenuItems={menuItems} navMenuCtas={menuCtas}>
      <SEO
        title={pageTitle}
        description={site.description}
        keywords={site.keywords}
      />
      <PageHeader
        content="Tab list"
        tabs={classTypes}
        sharedPath="/classes/"
        title="Spanish classes"
        subtitle="Learn the way you learn best"
      />
      <Container>
        <LayoutSidebar>
          <ClassOverview {...classType} />
          <div>Sidebar</div>
        </LayoutSidebar>
      </Container>
      <CtaForm title="Need lessons? Schedule a demo lesson" />
      <Footer />
    </Layout>
  );
};

export default ClassType;