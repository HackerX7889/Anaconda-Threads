module.exports = {
  data: {
    name: `fav-color`,
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You said your favourite color to be ${interaction.fields.getTextInputValue(
        "favColorInput"
      )}`,
    });
  },
};
