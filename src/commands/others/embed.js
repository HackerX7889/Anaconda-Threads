const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Returns an embed!'),
        async execute(interaction, client) {
            const embed = new EmbedBuilder()
                .setTitle('Test Embed')
                .setDescription('This is a test embed')
                .setColor('Random')
                .setImage(client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({
                    url: `https://www.youtube.com/@RetoxinGaming`,
                    iconURL: client.user.displayAvatarURL(),
                    name: interaction.user.tag 
                })
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.tag
                })
                .setURL('https://www.youtube.com/@RetoxinGaming')
                .addFields([
                    {
                        name: 'Test Field 1',
                        value: 'This is a test field (1)',
                        inline: true
                    },
                    {
                        name: 'Test Field 2',
                        value: 'This is a test field (2)',
                        inline: true
                    }
                ])
                .setTimestamp(Date.now())

            await interaction.reply({
                embeds: [embed]
            })
        }
}