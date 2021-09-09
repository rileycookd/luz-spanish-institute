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
  const isEditUserForm = payload.data.formId === "edit-user-form"
  // Build the document JSON and submit it to SANITY
  if (isRegistrationForm) {
    weeklySchedule=[];
    if(payload.data.classSchedule1) weeklySchedule.push(payload.data.classSchedule1)
    if(payload.data.classSchedule2) weeklySchedule.push(payload.data.classSchedule2)
    if(payload.data.classSchedule3) weeklySchedule.push(payload.data.classSchedule3)
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
      frequency: payload.data.frequency,
      timezone: payload.data.timezone,
      schedule: weeklySchedule
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
  if (isEditUserForm) {
    const editUserForm = {
      _id: payload.data._id,
      name: payload.data.name,
      email: payload.data.email,
      city: payload.data.city,
      phone: payload.data.phone,
      country: payload.data.country,
      timezone: payload.data.timezone,
      company: payload.data.company
    }
    const result = await client
      .patch(_id) // Document ID to patch
      .set({
        name: editUserForm.name,
        email: editUserForm.email,
        city: editUserForm.city,
        phone: editUserForm.phone,
        country: editUserForm.country,
        timezone: editUserForm.timezone,
        company: editUserForm.company,
      }) // Shallow merge
      .commit() // Perform the patch and return a promise
      .then((updatedUser) => {
        console.log('Hurray, the user is updated! New document:')
        console.log(updatedUser)
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message)
      })
  }
  callback(null, {
    statusCode: 200,
  })
}