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
  const isContactForm = payload.data.formId === "contact-form"
  // Build the document JSON and submit it to SANITY
  if (isRegistrationForm) {
    const registrationForm = {
      _type: "registrationForm",
      submitDate: new Date().toISOString(),
      name: payload.data.name,
      email: payload.data.email,
      location: payload.data.location,
      classType: payload.data.classType,
      level: payload.data.level,
      classSize: payload.data.classSize,
      duration: payload.data.duration,
      quantity: payload.data.quantity,
      frequency: payload.data.frequency
    }
    const result = await client.create(registrationForm).catch((err) => console.log(err))
  }
  if (isContactForm) {
    const contactForm = {
      _type: "contactForm",
      submitDate: new Date().toISOString(),
      name: payload.data.name,
      email: payload.data.email,
      message: payload.data.message
    }
    const result = await client.create(contactForm).catch((err) => console.log(err))
  }
  callback(null, {
    statusCode: 200,
  })
}