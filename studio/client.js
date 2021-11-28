import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET, 
  token: SANITY_FORM_SUBMIT_TOKEN,
  apiVersion: '2021-10-21',
  useCdn: false,
});
