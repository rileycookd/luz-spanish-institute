import React from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'
import PageHeader from '../components/page-header'
import LayoutSidebar from "../components/layout-sidebar";
import Article from '../components/article'


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
      author {
        name
      }
      _rawContent(resolveReferences: {maxDepth: 5})
    }

    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      _rawDefaultNav(resolveReferences: {maxDepth: 10})
    }
  }
`;

const ResourcePage = (props) => {
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

  const resource = (data || {}).resource;

  return (
    <Layout navMenuItems={menuItems} navMenuCtas={menuCtas}>
      <SEO
          title={resource.title}
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        <PageHeader
          content="Tab list"
          sharedPath="/classes/"
          title={resource.title}
        />
        <LayoutSidebar>
          <Article {...resource} />
          <div>Sidebar</div>
        </LayoutSidebar>
      </Container>
    </Layout>
  );
};

export default ResourcePage;