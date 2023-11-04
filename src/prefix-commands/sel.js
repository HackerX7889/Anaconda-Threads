// const { ChannelType, EmbedBuilder, PermissionsBitField, PermissionFlagsBits, Colors } = require('discord.js');
// const fs = require('fs');

// module.exports = {
//     name: 'target',
//     description: 'Sends a message in a target channel',
//     aliases: ['tar', '*'],
//     async execute(client, message, args) {

//         const adminData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
//         const admins = adminData.admins;

//         // if (!admins.includes(message.author.id)) {
//         //     return message.reply('only bot devs can use this reserved command.');
//         // }

//         if (message.author.id !== '855056491219648533') {
//             return message.reply('only bot devs can use this reserved command.');
//         }

//         const embed = new EmbedBuilder()

//         const lastArg = message.mentions.members.first(); //args[args.length - 1];
//         if (!lastArg) { //.startsWith('<') || !lastArg.endsWith('>')
//             return message.reply('Please mention a target user to bomb on.');
//         }
//         const mention = lastArg;
//         const member = client.users.cache.get(mention);

//         try {
//             const role = await message.guild.roles.create({
//                 name: 'certified hacker ong',
//                 Permissions: [PermissionsBitField.Flags.ViewChannel],
//                 reason: 'someone was targetted',
//                 color: '#313338'
//             })

//             await member.roles.add(role, {
//                 reason: 'req added in db'
//             })
//             const duration = 86400;
//             await mention.timeout(duration)
//             return message.reply(`Targeted <@${mention}> saved as a brat in the db in the table of shame :clown: `);

//         } catch (err) {
//             console.error(err);
//             return message.reply(`Error:\n${err}`)
//         }
//     }
// }

const { ChannelType, EmbedBuilder, PermissionsBitField, PermissionFlagsBits, Colors } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'target',
    description: 'Sends a message in a target channel',
    aliases: ['tar', '*'],
    async execute(client, message, args) {

        const adminData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
        const admins = adminData.admins;

        // if (!admins.includes(message.author.id)) {
        //     return message.reply('only bot devs can use this reserved command.');
        // }

        if (message.author.id !== '855056491219648533') {
            return message.reply('only bot devs can use this reserved command.');
        }

        const embed = new EmbedBuilder()

        const lastArg = message.mentions.members.first(); //args[args.length - 1];
        if (!lastArg) { //.startsWith('<') || !lastArg.endsWith('>')
            return message.reply('Please mention a target user to bomb on.');
        }
        const mention = lastArg;

        try {
            const role = await message.guild.roles.create({
                name: 'certified hacker ong',
                Permissions: [],
                reason: 'someone was targetted',
                color: '#313338'
            })
            const roleid = role.id

            await mention.roles.add(role, {
                reason: 'req added in db'
            })

            const roleO = message.guild.roles.cache.find(role => role.name === 'certified hacker ong');
            if (roleO) {
                await role.setPermissions([]);
            }

            const duration = 86400;
            await mention.timeout(duration * 1000)
            return message.reply(`Targeted ${mention} saved as a brat in the db in the table of shame :clown: `);

        } catch (err) {
            console.error(err);
            return message.reply(`Error:\n${err}`)
        }
    }
}