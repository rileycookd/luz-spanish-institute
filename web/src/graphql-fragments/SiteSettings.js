import { graphql } from "gatsby";

export const SiteSettings = graphql`
  fragment SiteSettings on SanitySiteSettings {
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