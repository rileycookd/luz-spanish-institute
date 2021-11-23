// const sanityClient = require("@sanity/client")
// const client = sanityClient({
//   projectId: process.env.GATSBY_SANITY_PROJECT_ID,
//   dataset: process.env.GATSBY_SANITY_DATASET,
//   token: process.env.SANITY_FORM_SUBMIT_TOKEN,
//   useCDN: false,
// })

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
    // const contactForm = {
    //     _type: "contactForm",
    //     submitDate: new Date().toISOString(),
    //     name: payload.data.name,
    //     email: payload.data.email,
    //     message: payload.data.message
    // }
    // const result = await client.create(contactForm).catch((err) => console.log(err))
}