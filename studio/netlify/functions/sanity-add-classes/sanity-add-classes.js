const process = require('process')

const sanityClient = require('@sanity/client')

const addMinutes = require('date-fns/addMinutes')
const addDays = require('date-fns/addDays')
const getDay = require('date-fns/getDay')
const parseISO = require('date-fns/parseISO')
const formatISO = require('date-fns/formatISO')
const differenceInMinutes = require('date-fns/differenceInMinutes')
const { nanoid } = require('nanoid');

// Read more about configuring Netlify environment variables at
// https://docs.netlify.com/configure-builds/environment-variables/#declare-variables

const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  token: process.env.SANITY_FORM_SUBMIT_TOKEN,
  apiVersion: '2021-10-21',
  useCdn: false,
})

const getClassDuration = (start, end) => {
	return differenceInMinutes(
		new Date(2012, 1, 29, end.split(":")[0], end.split(":")[1]),
		new Date(2012, 1, 29, start.split(":")[0], start.split(":")[1])
	)
}

const handler = async (event) => {
  if (!event.httpMethod === 'POST') {
    return {
      statusCode: 400,
      body: 'unrecognized HTTP Method, only POST allowed',
    }
  }

  const payload = JSON.parse(event.body)
  if (!payload._id || payload.schedule || payload.packages) {
    return { status: 400, body: "Missing required data in request" }
  }

  const { _id, schedule, packages } = payload

	// Create an iterable array for adding consecutive class dates in a for loop
	const scheduleWithDifs= schedule.map((d, i) => {
		// Calculate the number of week days after previous class 
		let dif = 0
		if(i === 0) {
			dif = 7 - (Number(schedule[schedule.length - 1].day) - Number(d.day))
		} else {
			dif =  Number(d.day) - Number(schedule[i - 1].day)
		}
		return {
			dif: dif,
			start: d.time.start,
			duration: getClassDuration(d.time.start, d.time.end)
		}
	})

	const fillPackage = (package) => {
		let classes = []
		
		// Get weekday from package start date
		const startDay = getDay(parseISO(package.start))

		// Determine how many days after the start date the first class will be
		// (according to schedule array)
		let firstClassIndex = schedule.findIndex(d => Number(d.day) >= startDay)
		let differenceInDays = 0;
		if (firstClassIndex === -1) {
			// First class starts the week after the start date
			differenceInDays = 7 - (startDay - Number(schedule[0].day)) 
			firstClassIndex = 0
		} else {
			// First class starts same week as start date
			differenceInDays = Number(schedule[firstClassIndex].day) - startDay
		}

		// Starting date to add days to in for loop (to be updated each iteration)
		let currentISODate = formatISO(
			addDays(
				parseISO(`${package.start}`), 
				differenceInDays
			), 
			{ representation: 'date' }
		)

		// Starting index in scheduleWithDifs (to be updated each iteration)
		let currentScheduleIndex = firstClassIndex

		// Where the magic happens
		for(let i = 0; i < package.quantity; i++) {
			let daysToAdd = 0
			// Only add days after the first iteration
			if(i > 0) daysToAdd = scheduleWithDifs[currentScheduleIndex].dif
			let start = addDays(parseISO(
				`${currentISODate} ${scheduleWithDifs[currentScheduleIndex].start}`
			), daysToAdd)
			let end = formatISO(addMinutes(start, scheduleWithDifs[currentScheduleIndex].duration))
			currentISODate = formatISO(start, { representation: 'date' })
			start = formatISO(start)
			// Create class object
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
			// Check if we need to cycle through scheduleWithDifs again
			if(currentScheduleIndex === scheduleWithDifs.length) currentScheduleIndex = 0
		}	
		return classes
	}

	// Add classes to relevant packages
	let filledPackages = packages
		.filter(package => package.active && package.start && package.classes.length === 0)
		.map(package => {
		package.classes = fillPackage(package)
		return package
	})

	// Create a set object for Sanity
	let setObj = {}

	// Add a key value pair to setObj for each package to edit
	filledPackages.map(package => {
		let keyString = `packages[_key=="${package._key}"].classes`
		setObj[keyString] = package.classes
	})

  try {
    const result = await client
      .patch(_id)
      .set(setObj)
      .commit()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }
  } catch (error) {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 500,
      body: error.responseBody || JSON.stringify({ error: 'An error occurred' }),
    }
  }
}

module.exports = { handler }
