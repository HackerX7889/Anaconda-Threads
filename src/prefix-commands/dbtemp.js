const fs = require('fs');
const { EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ModalSubmitInteraction } = require('discord.js');
const OwnerID = process.env.BOT_OWNER_ID;
const { QuickDB } = require('quick.db');
const db = new QuickDB();

// const quickdb = require('quick.db');
// const db = new quickdb();

module.exports = {
    name: 'regUsers',
    description: 'Registers all users from role1, role2, and role3 to quickdb',
    aliases: ['reg'],
    async execute(client, message, args) {
      // Get the roles
      const role1 = '1112693413234622524'
      const role2 = '1112693452887564389'
      const role3 = '1112693481496916018'
      const oneRole = message.guild.roles.cache.find(role => role.id === role1);
      const twoRole = message.guild.roles.cache.find(role => role.id === role2);
      const threeRole = message.guild.roles.cache.find(role => role.id === role3);
    //   const oneRole = message.guild.roles.cache.get(role1);
    //   const twoRole = message.guild.roles.cache.get(role2);
    //   const threeRole = message.guild.roles.cache.get(role3);
  
      // Get all the members with the roles
    //   const membersWithRoles =  message.guild.members.cache.filter(member => {
    //     return member.roles.cache.has(oneRole) && member.roles.cache.has(twoRole) && member.roles.cache.has(threeRole);
    //   });

// Get all the members with the roles
        const membersWithRoles =  message.guild.members.cache.filter(member => {
            return [oneRole, twoRole, threeRole].some(role => member.roles.cache.has(role.id));
        });
  
      // Register the Discord IDs to quickdb
      try {
        membersWithRoles.forEach(member => {
            const id = member.user.id;
            db.set(`reg_`+id, true);
          });
          console.log(membersWithRoles.size);
      
          // Send a confirmation message
          message.channel.send(`Registered ${membersWithRoles.size} users to quickdb.`);
      } catch (error) {
        console.error(error);
        message.channel.send(`An error occurred while registering users. Please try again later.\n${error.message}`);
      }
    },
  };