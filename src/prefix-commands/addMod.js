
const fs = require('fs')
require('dotenv').config()
const OwnerID = process.env.BOT_OWNER_ID

module.exports = {
    name: 'add',
    description: 'Add a Mod in bot\'s memory',
    async execute(client, message, args) {

        // const adminsData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
        // const admins = adminsData.admins;

        try {

            if (message.author.id !== OwnerID) {
                return message.reply("Only The Bot's Chief Administrator or Owner Can Execute This Command!");
            } 

            const lastArg = args[args.length - 1];
            if (lastArg !== 'mod' && lastArg !== 'dev') {
                return message.reply('Invalid arguments passed. Please use `$add @user mod`.');
            }

            if (lastArg === 'mod') {
                const adminsData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
                const mods = adminsData.mods;
                const targetUser = message.mentions.users.first();
                if (!targetUser) {
                    return message.reply('Please mention a user to add as a mod.');
                }
                const targetUserID = targetUser.id;
                if (mods.includes(targetUserID)) {
                    return message.reply(`${targetUser.username} is already a mod.`);
                }
                mods.push(targetUserID);
                adminsData.mods = mods;
                fs.writeFileSync('./admins.json', JSON.stringify(adminsData));
                message.reply(`${targetUser.username} has been added as a mod.`);
            } else if (lastArg === 'dev') {

                if (message.author.id !== OwnerID) {
                    return message.reply("Only The Bot's Chief Administrator or Owner Can Execute This Command!");
                } 

                const adminsData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
                const devs = adminsData.devs;
                const targetUser = message.mentions.users.first();
                if (!targetUser) {
                    return message.reply('Please mention a user to add as a dev.');
                }
                const targetUserID = targetUser.id;
                if (devs.includes(targetUserID)) {
                    return message.reply(`${targetUser.username} is already a dev.`);
                }
                devs.push(targetUserID);
                adminsData.devs = devs;
                fs.writeFileSync('./admins.json', JSON.stringify(adminsData));
                message.reply(`${targetUser.username} has been added as a bot dev, they now have access to the bot's beta commands.`);

            }

        } catch (error) {
            console.error(error);
            message.reply('Something went wrong.');
        }
    }
}
