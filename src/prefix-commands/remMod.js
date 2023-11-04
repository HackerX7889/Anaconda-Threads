require('dotenv').config();
const fs = require('fs');
const OwnerID = process.env.BOT_OWNER_ID;

module.exports = {
    name: 'rem',
    description: 'Remove a Mod in bot\'s memory',
    async execute(client, message, args) {

        const adminsData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
        const admins = adminsData.admins;

        try {

            if (message.author.id !== OwnerID) {
                return message.reply("Only The Bot's Chief Administrator or Owner Can Execute This Command!");
            } 

            const lastArg = args[args.length - 1];
            if (lastArg !== 'mod' && lastArg !== 'dev') {
                return message.reply('Invalid arguments passed. Please use `$rem @user mod`.');
            }

            if (lastArg === 'mod') {
                const mods = adminsData.mods;
                const targetUser = message.mentions.users.first();
                if (!targetUser) {
                    return message.reply('Please mention a user to remove as a mod.');
                }
                const targetUserID = targetUser.id;
                if (!mods.includes(targetUserID)) {
                    return message.reply(`${targetUser.username} is not a mod.`);
                }
                const index = mods.indexOf(targetUserID);
                mods.splice(index, 1);
                adminsData.mods = mods;
                fs.writeFileSync('./admins.json', JSON.stringify(adminsData));
                message.reply(`${targetUser.username} has been removed as a mod.`);
            } else if (lastArg === 'dev') {

                if (message.author.id !== OwnerID) {
                    return message.reply("Only The Bot's Owner Can Execute This Command!");
                } 

                const devs = adminsData.devs;
                const targetUser = message.mentions.users.first();
                if (!targetUser) {
                    return message.reply('Please mention a user to remove as a mod.');
                }
                const targetUserID = targetUser.id;
                if (!devs.includes(targetUserID)) {
                    return message.reply(`${targetUser.username} is not a dev.`);
                }
                const index = devs.indexOf(targetUserID);
                devs.splice(index, 1);
                adminsData.devs = devs;
                fs.writeFileSync('./admins.json', JSON.stringify(adminsData));
                message.reply(`${targetUser.username} has been removed as a bot dev, all special feature access has been revoked from them.`);  
            }

        } catch (error) {
            console.error(error);
            message.reply('Something went wrong.');
        }
    }
}
