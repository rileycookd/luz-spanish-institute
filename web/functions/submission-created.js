const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_FORM_SUBMIT_TOKEN,
  useCDN: false,
})

exports.handler = async function (event, context, callback) {
  // Pulling out the payload from the body
  const { payload } = JSON.parse(event.body)
  // Checking which form has been submitted
  const isRegistrationForm = payload.data.formId === "registration-form"
  // Build the document JSON and submit it to SANITY
  if (isRegistrationForm) {
    const registrationForm = {
      _type: "registrationForm",
      name: payload.data.name,
      email: payload.data.email,
      location: payload.data.location,
      classType: payload.data.classType,
      level: payload.data.level,
      duration: payload.data.duration,
      quantity: payload.data.quantity,
      frequency: payload.data.frequency
    }
    const result = await client.create(registrationForm).catch((err) => console.log(err))
  }
  callback(null, {
    statusCode: 200,
  })
}