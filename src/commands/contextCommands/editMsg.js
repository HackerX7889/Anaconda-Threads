const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, ChannelType, ModalBuilder, TextInputStyle, TextInputBuilder, ModalSubmitInteraction } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const clientid = process.env.clientid;

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Edit Bot Msg')
        .setType(ApplicationCommandType.Message),
    async execute(interaction, client) {
        const editmsgChannelId = '1112693297408901191'
        const channel = await client.channels.fetch(editmsgChannelId);

        const user = clientid;
        const userID = await client.users.fetch(user);
        const messages = await channel.messages.fetch({ after: '0', limit: 100 }); // Fetch up to 100 messages

        const userMessages = messages.filter(msg => msg.author.id === userID);

        if (!userMessages) {
            return await interaction.reply({ content: `This command can only be executed on the messages sent by <@${client.user.id}>`, ephemeral: true });
        }

        if (interaction.channel.id !== editmsgChannelId) {
            return await interaction.reply({ content: 'This context-command can only be used for messages in <#1036982942204956743>!', ephemeral: true });
        }

        const message = await channel.messages.fetch(interaction.targetId);
        // await interaction.reply({
        //     content: `Bot's message content: ${message.content}`,
        //     ephemeral: true
        // });

        const adminsData = JSON.parse(fs.readFileSync('./admins.json', 'utf8'));
        const mods = adminsData.mods;

        try {
            if (!mods.includes(interaction.user.id)) {
                return await interaction.reply({
                    content: "Only The Bot's Moderators Can Execute This Command!",
                    ephemeral: true
                });
            }
            const placeholder = ``

            const modal = new ModalBuilder()
                .setCustomId('editmsg-modal')
                .setTitle('Edit Bot Msg')

            const textInput = new TextInputBuilder()
                .setCustomId('text-input01')
                .setLabel('New Messages')
                .setRequired(false)
                .setStyle(TextInputStyle.Paragraph);

            const row = new ActionRowBuilder().addComponents(textInput);
            modal.addComponents(row);
            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === 'editmsg-modal';

            const modalSubmit = await interaction.awaitModalSubmit({ filter, time: 1_800_000 });
            if (modalSubmit instanceof ModalSubmitInteraction) {
                const msg = modalSubmit.fields.getTextInputValue('text-input01')
                const msg2 = await message.edit(`${msg}`)
                await modalSubmit.reply({
                    content: `edited the previous msg content to new:\n${msg}`,
                    ephemeral: true
                })
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while executing this command.' + err, ephemeral: true });
        }
    }
}