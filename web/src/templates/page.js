import React, { useState } from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'

import Header from '../components/header'
import InfoBlock from '../components/info-block'
import ClassPreviewGrid from '../components/class-preview-grid'
import PostPreviewGrid from '../components/post-preview-grid'
import TestimonialBlock from '../components/testimonial-block'
import CtaForm from '../components/cta-form'
import Footer from '../components/footer'
import { cssColorToHex } from "jimp";
import LayoutSidebar, { SidebarCta } from "../components/layout-sidebar";

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    route: sanityRoute(id: { eq: $id }) {
      slug {
        current
      }
      useSiteTitle
      page {
        ...PageInfo
      }
    }
  }
`;


const Page = (props) => {
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

  const page = data.page || data.route.page;
  
  const content = (page._rawContent || [])
    .filter((c) => !c.disabled)
    .map((c, i) => {
      let el = null;
      switch (c._type) {
        case "infoBlock":
          el = <InfoBlock key={c._key} {...c} />;
          break;
        case "classTypesList":
          let nodes = c.classTypes
          el = (
          <LayoutSidebar reverse={true} wide={true}>
            <SidebarCta {...c} />
            <PostPreviewGrid key={c._key} nodes={nodes} />
          </LayoutSidebar>
          );
          break;
        case "testimonialGroup":
          el = <TestimonialBlock key={c._key} {...c} />;
          break;
        case "hero":
          c.kind === 'header' 
          ? el = <Header key={c._key} {...c} />
          : el = <Header key={c._key} {...c} />
          break;
        case "form":
          el = <CtaForm key={c._key} {...c} />
          break;
        default:
          el = null;
      }
      return el;
    });

  const menuItems = page.navMenu && (page.navMenu._rawItems || []);

  const pageTitle = data.route && !data.route.useSiteTitle && page.openGraph.title
    ? page.openGraph.title 
    : page.title;

  const pageDescription = page.openGraph && page.openGraph.description
    ? page.openGraph.description
    : site.openGraph && site.openGraph.description || site.description

  const pageImage = page.openGraph && page.openGraph.pageImage
    ? page.openGraph.pageImage
    : site.openGraph && site.openGraph.image || null

  return (
    <Layout navMenuItems={menuItems}>
      <SEO
          title={pageTitle}
          description={pageDescription}
          image={pageImage}
          keywords={site.keywords}
          pathname={props.pathname || null}
        />
      <Container>
        {content}
        <Footer {...data.site.defaultFooter} />
      </Container>
    </Layout>
  );
};

export default Page;