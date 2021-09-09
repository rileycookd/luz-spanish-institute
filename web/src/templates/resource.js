import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'
import PageHeader from '../components/page-header'
import LayoutSidebar from "../components/layout-sidebar";
import Article from '../components/article'
import SectionLinks from '../components/section-links'
import Footer from '../components/footer';



export const query = graphql`
  query ResourceTemplateQuery($id: String!) {
    resource: sanityResource(id: { eq: $id }) {
      slug {
        current
      }
      _id
      _createdAt
      _updatedAt
      description
      title
      image {
        ...SanityImage
      }
      author {
        name
      }
      _rawContent(resolveReferences: {maxDepth: 5})
    }

    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      siteUrl
      _rawDefaultNav(resolveReferences: {maxDepth: 10})
    }
  }
`;

const ResourcePage = (props) => {
  const { data, errors } = props;

  const [anchorIds, setAnchorIds] = useState([])


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

  const resource = (data || {}).resource;

  return (
    <Layout navMenuItems={menuItems} navMenuCtas={menuCtas}>
      <SEO
        title={resource.title}
        description={site.description}
        keywords={site.keywords}
      />
      <PageHeader
        content="Tab list"
        sharedPath="/classes/"
        title={resource.title}
        propsAddedHeight={80}
      />
      <Container>
        <LayoutSidebar style={{paddingTop: '0'}}>
          <Article 
            {...resource} 
            setAnchorIds={setAnchorIds} 
            url={`${site.siteUrl.replace(/\/$/, '')}${props.location.pathname}`} 
          />
          {anchorIds.length && (
            <SectionLinks anchorIds={anchorIds} path={props.location.pathname} />
          )}
        </LayoutSidebar>
      </Container>   
      <Footer />
    </Layout>
  );
};

export default ResourcePage;