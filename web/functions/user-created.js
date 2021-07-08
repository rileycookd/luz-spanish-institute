const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_FORM_SUBMIT_TOKEN,
  useCDN: false,
})

exports.handler = async (event, context, callback) => {
  const { payload } = JSON.parse(event.body);
  const user = payload.user

  console.log("Payload: ", payload)
  console.log("User: ", user)
    
  const sanityUser = {
      _type: "student",
      name: user.name || user.user_metadata.full_name,
      email: user.email
    }
  const result = await client.create(sanityUser).catch((err) => console.log(err))

  callback(null, {
    statusCode: 200,
  })

  // adminAuth
  //   .createUser({email, password})
  //   .then(userRecord => {
  //     callback(null, {
  //       statusCode: 200
  //     });
  //   })
  //   .catch((error) => {
  //     let msg = '';

  //     if (error.code === 'auth/invalid-password') {
  //       msg = `L'identifiant de l'appareil doit avoir au moins 6 caractères`;
  //     }
  //     else if (error.code === 'auth/email-already-exists') {
  //       msg = `L'email indiqué est déjà utilisé`;
  //     }

  //     callback(null, {
  //       statusCode: 400,
  //       body: JSON.stringify({code: error.code, msg})
  //     });
  //   });
}