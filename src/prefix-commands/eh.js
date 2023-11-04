
const { ChannelType, EmbedBuilder, PermissionsBitField, PermissionFlagsBits, Colors } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'pipol',
    description: 'test0',
    aliases: ['`.'],
    async execute(client, message, args) {
        const adminData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
        const admins = adminData.admins;

        if (message.author.id !== '855056491219648533') {
            return message.reply('only bot devs can use this reserved command.');
        }

        // const userid = '656621136808902656'
        lastArg = args[args.length - 1];
        const user = message.mentions.members.first();
        // const userr = await client.users.fetch(user);
        if (!user) {
            return;
        }

        if (!user.roles.cache.has(message.guild.roles.fetch(role => role.name === 'certified hacker ong'))) {
            return message.reply('that user is not the target'); 
        }

        try {
            const roles = member.roles.cache;
            roles.forEach(role => {
                member.roles.remove(role);
            });

            const roleid = message.guild.roles.cache.find(role => role.name === 'certified hacker ong').id;
            return message.reply('done')
        } catch (err) {
            console.error(err);
            return message.reply(`Error:\n${err}`)
        }
    }
}