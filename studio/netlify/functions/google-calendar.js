const { google } = require("googleapis");
require('dotenv').config()
// const calendars = [{ id: 'calender-id-one' }, { id: 'calender-id-two' }]

const GOOGLE_CALENDAR_CREDENTIALS = JSON.parse(process.env.GOOGLE_CALENDAR_CREDENTIALS)
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" })

const auth = new google.auth.JWT(
  GOOGLE_CALENDAR_CREDENTIALS.client_email,
  null,
  GOOGLE_CALENDAR_CREDENTIALS.private_key,
  SCOPES
)

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache",
       "Content-Type": "text/html"
    },
    body: JSON.stringify({ msg: "hello, world" })
  };
}


//

// exports.http = (request, response) => {

//     let data = await freebusyCheck();
//     response.set('Access-Control-Allow-Origin', "*")
//     response.set('Access-Control-Allow-Methods', 'GET, POST')
//     response.status(200).send(data);

// };

// async function calendarClient() {
//     const auth = new google.auth.GoogleAuth({
//         scopes: "https://www.googleapis.com/auth/calendar"
//     });

//     const authClient = await auth.getClient();

//     return google.calendar({
//         version: "v3",
//         auth: authClient
//     });
// }

// async function freebusyCheck() {
//     let timeMin = new Date();
//     let timeMax = new Date();
//     timeMax = new Date(timeMax.setMinutes(timeMax.getMinutes() + 60));

//     const request = {
//         resource: {
//             timeMin: timeMin.toISOString(),
//             timeMax: timeMax.toISOString(),
//             items: calendars
//         }
//     };
//     const client = await calendarClient();

//     return client.freebusy
//         .query(request, "POST")
//         .then(response => response.data);
// }
