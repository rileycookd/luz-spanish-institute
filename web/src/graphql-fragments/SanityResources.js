

import { graphql, useStaticQuery } from "gatsby";

export const SanityResources = graphql`
  fragment SanityResources on allSanityResource {
    title
    description
    keywords
    openGraph {
      title
      description
      image {
        ...SanityImage
      }
    }
    defaultNav {
      ...NavMenu
    }
    defaultFooter {
      ...Footer
    }
  }
`;

export const useSiteSettings = () => {
  const { sanitySiteSettings } = useStaticQuery(
    graphql`
      query SiteMetaData {
        sanitySiteSettings {
          title
          description
          keywords
          openGraph {
            title
            description
            image {
              ...SanityImage
            }
          }
          defaultNav {
            ...NavMenu
          }
          defaultFooter {
            ...Footer
          }
        }
      }
    `
  )
  return sanitySiteSettings
}