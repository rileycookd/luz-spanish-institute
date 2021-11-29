const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_FORM_SUBMIT_TOKEN,
  apiVersion: '2021-10-21',
  useCDN: false,
})

const qs = require('qs')

const { nanoid } = require('nanoid');
const { GiConsoleController } = require("react-icons/gi");

exports.handler = async function (event, context, callback) {
  
  // Pulling out the payload from the body
  const { payload } = JSON.parse(event.body)


  // Checking which form has been submitted
  const isRegistrationForm = payload.data.formId === "registration-form"
  const isContactForm = payload.data.formId === "contact-form"
  const isEditUserForm = payload.data.formId === "edit-user-form"
  const isAddRegistrationForm = payload.data.formId === "add-registration-form"
  // Build the document JSON and submit it to SANITY
  if (isAddRegistrationForm) {
    const parsedData = qs.parse(payload.data)

    console.log("PARSED DATA: ", parsedData)
    
    let schedule = parsedData?.days
      ?.map(d => (
        {
          _key: nanoid(),
          _type: "classDayTime",
          day: d.day.toLowerCase(),
          time: {
            _type: "timeRange",
            start: d.start,
            end: d.end
          }
        }
      ))

    let studentRefs = [
      {
        _type: "reference",
        _key: nanoid(),
        _ref: parsedData._id
      }
    ]

    let languageRef = {
      _type: "reference",
      _ref: parsedData.language
    }

    let classTypeRef = {
      _type: "reference",
      _ref: parsedData.classType
    }

    let addRegistrationForm = {
      _type: "addRegistrationForm",
      submitDate: new Date().toISOString(),
      state: 'pending',
      students: studentRefs,
      classType: classTypeRef,
      schedule: schedule,
      language: languageRef,
      classSize: parsedData.size,
      packages: [
        {
          _key: nanoid(),
          _type: 'registrationPackage',
          quantity: Number(parsedData.quantity),
          classes: [],
          start: '',
          end: '',
        }
      ]
    }

    console.log("RESULT: ", addRegistrationForm)

    const result = await client.create(addRegistrationForm).catch((err) => console.log(err))

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
    console.log("PAYLOAD:", payload.data)
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
      .patch(editUserForm._id) // Document ID to patch
      .set({
        name: editUserForm.name ? editUserForm.name : '',
        email: editUserForm.email ? editUserForm.email : '',
        city: editUserForm.city ? editUserForm.city : '',
        phone: editUserForm.phone ? editUserForm.phone : '',
        country: editUserForm.country ? editUserForm.country : '',
        timezone: editUserForm.timezone ? editUserForm.timezone : '',
        company: editUserForm.company ? editUserForm.company : '',
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