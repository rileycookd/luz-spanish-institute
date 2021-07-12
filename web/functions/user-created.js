const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_FORM_SUBMIT_TOKEN,
  useCDN: false,
})

exports.handler = async (event, context, callback) => {
  const { user } = JSON.parse(event.body);
    
  const sanityUser = {
      _type: "student",
      name: user.user_metadata.full_name,
      email: user.email
    }
  const result = await client.create(sanityUser).catch((err) => console.log(err))

  callback(null, {
    statusCode: 200,
  })
}