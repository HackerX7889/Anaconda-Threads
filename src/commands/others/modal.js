const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('Creates a modal'),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId('fav-color')
            .setTitle('Fav Color?')

        const textInput = new TextInputBuilder()
            .setCustomId('favColorInput')
            .setLabel('Input your favourite color')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal);
    }
}