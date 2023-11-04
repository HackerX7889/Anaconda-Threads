const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
require('dotenv').config();

module.exports = (client, interaction) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        // console.log(`${command.data.name} has been passed through the handler sucessfully`)
      }
    }

    const clientId = process.env.clientid;
    const rest = new REST({ version: "10" }).setToken(process.env.token);
    try {
      console.log("Started Refreashing Application (/) Commands");

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Successfully Refreshed Application (/) Commands");
    } catch (error) {
      console.error(error);
    }
  };
};
