import { graphql } from "gatsby";

export const Footer = graphql`
  fragment Footer on SanityFooter {
    _rawItems(resolveReferences: {maxDepth: 10})
    title
  }
`;