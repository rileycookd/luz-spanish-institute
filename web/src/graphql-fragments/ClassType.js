import { graphql } from "gatsby";

export const ClassType = graphql`
  fragment ClassType on SanityClassType {  
    title
    min
    max
    pricing {
      duration
      price
      _key
      _type
    }
    packages {
      discount
      quantity
      title
      _type
      _key
    }
    order
  }
`;
