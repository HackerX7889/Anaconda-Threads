const fs = require('fs');
const { EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder, TextInputStyle, TextInputBuilder, ModalBuilder, ModalSubmitInteraction } = require('discord.js');
const OwnerID = process.env.BOT_OWNER_ID;
// const initSchema = require('../schemas/guildSetting');

module.exports = {
    name: `thread`,
    description: `Create a thread for tryout purposes`,
    async execute(client, message, args) {
        const adminsData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
        //const admins = adminsData.admins;
        const mods = adminsData.mods;
        
        if (message.author.id !== OwnerID && !mods.includes(message.author.id)) {
            return message.reply("Only privileged bot members can use this command!");
        } 

        try {
            const targetUserr = message.mentions.users.first();
            if (!targetUserr) {
                return message.reply('Please mention a user to create a thread for.');
            }
            const userrr = await client.users.fetch(targetUserr);

            // const guildID = message.guild.id;
            // const init = await initSchema.findOne({ Guild: guildID });
            // const channelID = init.extraChannels.find((channel) => channel.name === 'threads').value;
            const channelID = '1112693252185919549'
            const channel = client.channels.cache.get(channelID);

            const threadName = `tryout of ${targetUserr.username}`;
            // const channel = message.guild.channels.cache.get('1158342978755100732');
            const thread = await channel.threads.create({
                name: threadName,
                type: ChannelType.PublicThread,
                reason: `tryout of ${targetUserr.username} by ${message.author.username}`,
                autoArchiveDuration: 60,
            });

            const threadCreator = message.author;
            const threadCreatorMention = `<@${threadCreator.id}>`;
            const targetUserMention = `<@${targetUserr.id}>`;

            const embed = new EmbedBuilder()
                .setTitle('New Thread Created')
                .setDescription(`A new thread has been created for tryout purpose.\n ${threadCreatorMention} please create a 3v3 equal terms match in SFA (global version), and share your fight-ID with ${targetUserMention}.`)
                .setColor('Blue');

            const button = new ButtonBuilder()
                .setLabel(`Accept ${targetUserr.username}`)
                .setStyle(ButtonStyle.Success)
                .setCustomId('accept-one');

            const button2 = new ButtonBuilder()
                .setLabel(`Decline ${targetUserr.username}`)
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('decline-one');

            const row = new ActionRowBuilder().addComponents(button, button2);

            const msg = await thread.send({ content: `${threadCreatorMention} wants to take the tryout of ${targetUserMention}`, embeds: [embed], components: [row] });
            message.reply({
                content: `created a new thread, <#${thread.id}>`
            })

            const collector = await thread.createMessageComponentCollector();
            collector.on('collect', async (m) => {
              const iUser = m.message.embeds[0].description.split("<@")[1].split(">")[0]
              // const iUser = m.message.embeds.description.split("<@")[1].split(">")
              const iUserrr = message.guild.members.fetch(iUser)
                const ASrole = '1112693413234622524'
                const EUrole = '1112693452887564389'
                const NArole = '1112693481496916018'
                const role1 = m.guild.roles.cache.get(ASrole);
                const role2 = m.guild.roles.cache.get(EUrole);
                const role3 = m.guild.roles.cache.get(NArole);
                const targetUser = iUser;
                // const targetMember = m.guild.members.fetch(iUser.id); // Modified line
                const targetMember = await message.guild.members.fetch(targetUserr);
                if (m.customId === 'accept-one') {
                  if (!mods.includes(message.author.id)) {
                    return m.reply({ content: "Only The Bot's Chief Administrator Can Manage points!", ephemeral: true });
                  }
                    
                    if (m.user.id !== message.author.id) {
                    return m.reply({
                        content: 'you are not permitted to use this button',
                        ephemeral: true
                    })
                  }

                  const modal = new ModalBuilder()
                    .setCustomId(`threadRole`)
                    .setTitle('Choose the region of participant')

                    const textInput = new TextInputBuilder()
                    .setCustomId('region01')
                    .setLabel('Region Role (2 letters Capitalized)')
                    .setPlaceholder('AS / EU / NA')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                    const oneRow = new ActionRowBuilder().addComponents(textInput)
                    modal.addComponents(oneRow)
                    await m.showModal(modal).catch(console.error);

                    try {
                      const filter = (message) => message.customId === 'threadRole';
                      const modalSubmit = await m.awaitModalSubmit({ filter, time: 1_800_000 });
                      if (modalSubmit instanceof ModalSubmitInteraction) {
                        regionRole = modalSubmit.fields.getTextInputValue('region01');

                        const embed2 = new EmbedBuilder()
                        .setTitle(`Accepted ${targetUserr.username}!`)
                        .setDescription(`Accepted ${targetUserr} in the clan!, adding the **txn \`${regionRole}\` role**, change it later if you want,\ntell ${targetUserr} to type \`!apply\` whenever they want to get the clan tag!.`)
                        .setColor('Green')
                        .setFooter({ text: `thread will be archived soon.` });
                        await modalSubmit.reply({ embeds: [embed2], components: [] });
                        // console.log(userrr)


                        if (regionRole === 'As') {
                          if (targetMember && targetMember.roles && typeof targetMember.roles.add === 'function') {
                            targetMember.roles.add(role1).catch(console.error);
                          } else {
                            // console.error('iUser or iUser.roles.add is not defined');
                            return;
                          }
                        }
                        if (regionRole === 'Eu') {
                          if (targetMember && targetMember.roles && typeof targetMember.roles.add === 'function') {
                            targetMember.roles.add(role2).catch(console.error);
                          } else {
                            // console.error('iUser or iUser.roles.add is not defined');
                            return;
                          }
                        }
                        if (regionRole === 'Na') {
                          if (targetMember && targetMember.roles && typeof targetMember.roles.add === 'function') {
                            targetMember.roles.add(role3).catch(console.error);
                          } else {
                            // console.error('iUser or iUser.roles.add is not defined');
                            return;
                          }
                        }
 
                        if (regionRole === 'AS') {
                          targetMember.roles.add(role1).catch(console.error);
                        } else if (regionRole === 'EU') {
                          targetMember.roles.add(role2).catch(console.error);
                        } else if (regionRole === 'NA') {
                          targetMember.roles.add(role3).catch(console.error);
                        }

                        // iUser.roles.add(role1).catch(console.error);
                        setTimeout(async () => {
                          await msg.delete();
                          // await message.delete();
                        }, 1000)

                        setTimeout(async () => {
                          await thread.edit({
                            locked: true,
                            reason: `accepted ${targetUserr.username}, tryout ends`
                          })
                        }, 6 * 1000);
                      } else {
                        // console.error('modalSubmit is not an instance of ModalSubmitInteraction');
                        if (regionRole !== 'AS' && regionRole !== 'EU' && regionRole !== 'NA' && regionRole !== 'As', regionRole !== 'Eu', regionRole !== 'Na') {
                          return await m.reply({ content: 'Please only input (AS // EU // NA) as the region', ephemeral: true });
                        }
                      }
                    } catch (err) {
                      console.error(err)
                    }

                  // setTimeout( async () => {
                  //   await msg.delete();
                  // }, 1000);

                  // setTimeout(() => {
                  //   thread.delete();
                  // }, 60 * 1000); // Modified line
                  // return m.reply({ embeds: [embed2], components: [] });
                } else if (m.customId === 'decline-one') {
                  if (!mods.includes(message.author.id)) {
                    return m.reply({ content: "Only The Bot's Chief Administrator Can Manage points!", ephemeral: true });
                  }
                  if (m.user.id !== message.author.id) {
                    return m.reply({
                        content: 'you are not permitted to use this button',
                        ephemeral: true
                    })
                  }
                  const embed3 = new EmbedBuilder()
                    .setTitle(`Declined ${targetUserr.username}!`)
                    .setDescription(`Declined ${targetUserMention} in the clan!`)
                    .setColor('Red')
                    .setFooter({ text: `thread will be archived soon.` });

                    setTimeout( async () => {
                      await msg.delete();
                    }, 1000);

                  // setTimeout(() => {
                  //   thread.delete();
                  // }, 60 * 1000);

                    setTimeout(async () => {
                      await thread.edit({
                        locked: true,
                        reason: `declined ${targetUserr.username}, tryout aborted`
                      })
                    }, 6 * 1000);
                  return m.reply({ embeds: [embed3], components: [] });
             }

            })
        } catch (error) {
            console.error(error);
            message.reply('Something went wrong.');
        }
    }
}
