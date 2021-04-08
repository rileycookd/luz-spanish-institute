  
import { graphql } from "gatsby";

export const PageInfo = graphql`
  fragment PageInfo on SanityPage {
    id
    navMenu {
      ...NavMenu
    }
    _rawContent(resolveReferences: { maxDepth: 10 })
    title
  }
`;