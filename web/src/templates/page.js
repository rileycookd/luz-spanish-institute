import React, { useState } from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Container from '../components/container'

import Header from '../components/header'
import InfoBlock from '../components/info-block'
import ClassPreviewGrid from '../components/class-preview-grid'
import TestimonialBlock from '../components/testimonial-block'
import CtaForm from '../components/cta-form'
import Footer from '../components/footer'

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
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
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
          el = <ClassPreviewGrid key={c._key} {...c} />;
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
  const menuCtas = page.navMenu && (page.navMenu._rawCtas || []);

  const pageTitle = data.route && !data.route.useSiteTitle && page.title;
  const { _rawHeaderContent, headerSubtitle, headerImage } = page;
  const headerTitle = page.headerTitle ? page.headerTitle : pageTitle

  return (
    <Layout navMenuItems={menuItems} navMenuCtas={menuCtas}>
      <SEO
          title={pageTitle}
          description={site.description}
          keywords={site.keywords}
        />
      <Container>
        {content}
        <Footer />
      </Container>
    </Layout>
  );
};

export default Page;