import React from "react";
import { graphql } from "gatsby";

import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'

import PageHeader from '../components/page-header'
import PostPreviewGrid from "../components/post-preview-grid";
import PostPreview from "../components/post-preview";
import LayoutSidebar from '../components/layout-sidebar'
import Footer from '../components/footer'

import { useSiteSettings } from "../graphql-hooks/SiteSettings";


const Homepage = (props) => {
  const { data, errors } = props;

  console.log(props)

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} /> 
      </Layout>
    );
  }

  const site = useSiteSettings()
  console.log(site)

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const menuItems = site && (site.defaultNav._rawItems || []);

  // const resources = (data || {}).resources.edges
  //   ? mapEdgesToNodes(data.resources).filter(filterOutDocsWithoutSlugs)
  //   : []
  // resources.sort((a, b) => a.order - b.order); 

  return (
    <Layout navMenuItems={menuItems}>
      <SEO
          title={'Learning resources'}
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        {/* <PageHeader
          content="Tab list"
          tabs={classTypes}
          sharedPath="/classes/"
          title="Spanish classes"
          subtitle="Learn the way you learn best"
        /> */}
        <LayoutSidebar>
          {/* <PostPreviewGrid title="Resources" nodes={resources} /> */}
          <div>Sidebar</div>
        </LayoutSidebar>
        <Footer />
      </Container>
    </Layout>
  );
};

export default Homepage;