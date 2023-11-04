const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies with a button!'),
        async execute(interaction, client) {
            const button = new ButtonBuilder()
                .setCustomId('sub-yt')
                .setLabel('Subscribe')
                .setStyle(ButtonStyle.Secondary);

            await interaction.reply({
                components: [new ActionRowBuilder().addComponents(button)]        
            })
        }
}