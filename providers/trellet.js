//https://trellet.net/api/league/seasons/159
/**
 * Trellet events here
 */
const calendar = require('../calendar.js');
const axios = require("axios");
let simulator = "iRacing";
const org = "Trellet"
const urls = ["https://trellet.net/api/league/seasons/159", "https://trellet.net/api/league/seasons/158"]
async function parseTrellet(url) {
  const data = await axios.get(url);
  let seasonName = data.data.season.name
  let events = [];
  let trelleEvents = data.data.events
  trelleEvents.forEach(trelleEvent => {
    let event = {
      "summary": "Testing Calendar Event Creation",
      "location": "",
      "description": "",
      "start": { "dateTime": "", "timeZone": "Europe/Helsinki", },
      "end": { "dateTime": "", "timeZone": "Europe/Helsinki", },
      'attendees': [
        { 'email': `${org}@example.com` },
      ],
    }
    let dates = dateParser(trelleEvent.race_date)
    let link = `https://trellet.net/tulospalvelu/kausi/${data.data.season.id}`
    event.location = simulator;
    event.summary = `${trelleEvent.name}`;
    event.description = `Sarja: ${seasonName}
<br><a href="${link}">Linkki Trellet.netin tulospalveluun</a><br><a href="https://www.twitch.tv/simracingfi/">Kilpailulähetykset alkavat n. 20:15.</a> `
    event.start.dateTime = dates.starttime;
    event.end.dateTime = dates.endtime;
    events.push(event)
  })
  return events;
}

/**
 * @param {string} date for example 5.10.2022 klo 20:00
 * @return {object} {starttime: "date.toISOString()", endtime: "date.toISOString()"}
*/
function dateParser(date) {
  let starttime = `${date.substring(0, 10)}T19:00:00+02:00`;
  let endtime = `${date.substring(0, 10)}T23:00:00+02:00`;
  return { starttime, endtime }
}

urls.forEach(async (url) => {
  console.log('in trelle ' + url)
  parseTrellet(url).then(async (events) => {
    let queue = await calendar.createEventQueue(events);
    calendar.createEvents(queue);
  })
})