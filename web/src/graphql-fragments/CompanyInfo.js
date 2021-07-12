import { graphql } from "gatsby";

export const CompanyInfo = graphql`
  fragment CompanyInfo on SanityCompanyInfo {
    phone
    email
    timezone
    _rawDescription
    name
    facebook
    linkedin
    instagram
  }
`;