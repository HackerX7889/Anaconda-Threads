const {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("menu")
      .setDescription("Return a Select Menu!"),
    async execute(interaction, client) {
      const menu = new StringSelectMenuBuilder()
        .setCustomId(`sub-menu`)
        .setMaxValues(1)
        .setMaxValues(2)
        .setPlaceholder("Select your AI!")
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel(`OpenAI`)
            .setValue(`https://www.chat.openai.com`),
          new StringSelectMenuOptionBuilder()
            .setLabel(`You`)
            .setValue(`https://www.you.com`)
        );
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)],
      });
    },
  };
  