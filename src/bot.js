require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const commandPrefix = process.env.command_prefix;

const client = new Client({ intents: 3276799 });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.prefix = new Map();
client.prefix = new Collection();
client.devPrefix = new Map();
client.commandArray = [];

client.setMaxListeners(Infinity);

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

process.on("unhandledRejection", async (reason, promise) => {
  console.log('Unhandled Rejection At:', promise, 'Reason:', reason);
});

process.on("uncaughtException", (err, origin) => {
  console.log('Uncaught Exception:', err, origin);
})

const prefixFolders = fs.readdirSync(`./src/prefix-commands`).filter((file) => file.endsWith(".js"));

for (const arx of prefixFolders) {
  const Cmd = require(`./prefix-commands/` + arx);
  client.prefix.set(Cmd.name, Cmd);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);

client.on('messageCreate', async message => {
  const prefix = commandPrefix;

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const prefixCmd = client.prefix.get(command) || client.prefix.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (prefixCmd) {
    prefixCmd.execute(client, message, args);
  }
  // if (message.content === "<@!1138734014853824573>") {
  //   return message.reply("why you ping me?");
  // }
})