const cal = require('./calendar.js');
const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'providers');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

  const filePath = path.join(commandsPath, file);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

cal.writeCalendarEventsToHTML().then(console.log('done')).catch(console.error);