import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET, 
  apiVersion: '2021-10-21',
  useCdn: false,
});