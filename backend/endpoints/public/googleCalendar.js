const {google} = require('googleapis');
require('dotenv').config();

if (!(process.env.CREDENTIALS || process.env.CALENDAR_ID || process.env.WHITELIST)) {
    throw new Error('Missing required environment variables.');
}

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;



// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const calendar = google.calendar({version : "v3", auth});

// SECURITY FUNCTIONS

async function sanitize_event_json(json) {

    console.log(Array.isArray(json), json)

    const result = json.map(event => {
        const refactor = { 
            start: event.start.dateTime || event.start.date, 
            end: event.end.dateTime || event.end.date 
        };

        console.log(refactor);
        return refactor;
    })

    return result;
}

// API HANDLES
async function listEvents(from, to) {
    
    const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: from,
        timeMax: to,
        singleEvents: true,
        orderBy: 'startTime'
    });

    return response.data.items;
}

async function getAvailability(from, to) {
    const events = await listEvents(from, to);
    const sanitizedEvents = sanitize_event_json(events);

    return sanitizedEvents;
}

module.exports = {
    endpoint: 'get-availability',
    route: 'post',
    async execute(req, res) {
        const availability = await getAvailability(
            new Date('2024-12-01T00:00-05:00').toISOString(),
            new Date('2024-12-31T24:00-05:00').toISOString()
        );

        res.json(availability)
    }
}