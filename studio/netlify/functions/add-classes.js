const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  token: process.env.SANITY_FORM_SUBMIT_TOKEN,
  apiVersion: '2021-10-21',
  useCDN: false,
})
const addWeeks = require('date-fns/addWeeks')
const addMinutes = require('date-fns/addMinutes')
const addDays = require('date-fns/addDays')
const getDay = require('date-fns/getDay')
const getISODay = require('date-fns/getISODay')
const parseISO = require('date-fns/parseISO')
const formatISO = require('date-fns/formatISO')
const differenceInMinutes = require('date-fns/differenceInMinutes')
const { nanoid } = require('nanoid');

const getClassDuration = (start, end) => {
	return differenceInMinutes(
		new Date(2012, 1, 29, end.split(":")[0], end.split(":")[1]),
		new Date(2012, 1, 29, start.split(":")[0], start.split(":")[1])
	)
}

exports.handler = async function(event, context, callback) {
	const payload = JSON.parse(event.body)

	const packageObjKey = `packages[_key=="${payload._key}"].classes`

	let packages = []
	let registrationData = {}

	// WHY DOESN'T THIS WORK? Only shallow object available, but can be STRINGIFIED?
	//
	// const query = `
	// 	*[_type == 'addRegistrationForm' && _id == $id] { 
	// 		packages[] {
	// 			_key,
	// 			quantity,
	// 			start
	// 		}
	// 	}
	// `
	// const params = {id: payload._id}
	//
	// await client
	// 	.fetch(query, params)
	// 	.then(registration => {
	// 		packages = JSON.parse(registration.packages)
	// 		registrationData = registration
	// 	})


	await client.getDocument(payload._id).then((registration) => {
		packages = registration.packages
		registrationData = registration
	})

	const packageData = packages?.find(p => p._key === payload._key)


	let classes = []
	const schedule = registrationData.schedule.map((d, i) => {
		let dif = 0
		if(i === 0) {
			dif = 7 - (Number(registrationData.schedule[registrationData.schedule.length - 1].day) - Number(d.day))
		} else {
			dif =  Number(d.day) - Number(registrationData.schedule[i - 1].day)
		}
		return {
			dif: dif,
			start: d.time.start,
			duration: getClassDuration(d.time.start, d.time.end)
		}
	})

	const startDay = getDay(parseISO(packageData.start))
	let firstClassIndex = registrationData.schedule.findIndex(d => Number(d.day) >= startDay)
	let differenceInDays = 0;
	if (firstClassIndex === -1) {
		differenceInDays = 7 - (startDay - Number(registrationData.schedule[0].day)) 
		firstClassIndex = 0
	} else {
		differenceInDays = Number(registrationData.schedule[firstClassIndex].day) - startDay
	}

	let currentISODate = formatISO(
		addDays(
			parseISO(`${packageData.start}`), 
			differenceInDays
		), 
		{ representation: 'date' }
	)

	let currentScheduleIndex = firstClassIndex

	for(let i = 0; i < packageData.quantity; i++) {
		let daysToAdd = 0
		if(i > 0) daysToAdd = schedule[currentScheduleIndex].dif
		let start = addDays(parseISO(
			`${currentISODate} ${schedule[currentScheduleIndex].start}`
		), daysToAdd)
		let end = formatISO(addMinutes(start, schedule[currentScheduleIndex].duration))
		currentISODate = formatISO(start, { representation: 'date' })
		start = formatISO(start)
		classes.push(
			{
				_key: nanoid(),
				_type: "class",
				title: "Test",
				start: start,
				end: end,
				cancelled: false,
				content: []
			}
		)
		currentScheduleIndex++
		if(currentScheduleIndex === schedule.length) currentScheduleIndex = 0
	}	


	await client
			.patch(payload._id)
			.set({[packageObjKey]: classes})
			.commit()


	callback(null, {
		statusCode: 200,
		// body: JSON.stringify(document)
		body: JSON.stringify(classes)
	})
}