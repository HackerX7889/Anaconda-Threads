const { EmbedBuilder } = require('discord.js');
// const { QuickDB } = require("quick.db");
const axios = require('axios');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'apply',
    description: 'Apply to get the clan tag',
    async execute(client, message, args) {
        const role1 = '1112693413234622524'
        const role2 = '1112693452887564389'
        const role3 = '1112693481496916018'
        // const roleToRemove = '1163036296986501130'
        // const channel1 = '1142420682689491064';
        // const channel = message.guild.channels.cache.get(channel1);
        // const remRole = message.guild.roles.cache.get(roleToRemove)

        // const guildID = message.guild.id;
        // const init = await initSchema.findOne({ Guild: guildID });
        const channelID = '1112693338643107940'
        const channel = client.channels.cache.get(channelID);

        if (message.member.roles.cache.has(role1) || message.member.roles.cache.has(role2) || message.member.roles.cache.has(role3)) {

            const embed = new EmbedBuilder()
                .setColor('Green')
                .setDescription('The application process has started. Please check your DMs for further instructions.');
            message.react('✅').then(() => message.react('✅'));
            message.reply({ embeds: [embed] });

            const embed2 = new EmbedBuilder()
                .setColor('Blurple')
                .setTitle('Enter Your In-Game Name')
                .setDescription('Please enter your in-game name in plain text.')
                .setFooter({ text: 'You have 30 minutes to respond.' });

            message.author.send({ embeds: [embed2] }).then((dm) => {
                const filter = (m) => m.author.id === message.author.id;
                const collector = dm.channel.createMessageCollector({
                    filter,
                    time: 1800000
                });

                collector.on('collect', async (m) => {
                    const inGameName = `ŦXƝ ${m.content}`;

                    // const options = {
                    //     method: 'GET',
                    //     url: 'https://ajith-fancy-text-v1.p.rapidapi.com/text',
                    //     params: {
                    //         text: `${m.content}`
                    //     },
                    //     headers: {
                    //         'X-RapidAPI-Key': '747ebb36f7msh7af5d54cb2de7a6p1edb67jsn7e369cdf3045',
                    //         'X-RapidAPI-Host': 'ajith-Fancy-text-v1.p.rapidapi.com'
                    //     }
                    //     };
                    //     const response = await axios.request(options);
                    //     const fancyText = response.data.fancytext.split(',')[0];

                        const fancyFonts = {
                            'A': 'ƛ',
                            'B': 'Ɓ',
                            'C': 'Ƈ',
                            'D': 'Ɗ',
                            'E': 'Ɛ',
                            'F': 'Ƒ',
                            'G': 'Ɠ',
                            'H': 'Ӈ',
                            'I': 'ɨ',
                            'J': 'Ɉ',
                            'K': 'Ƙ',
                            'L': 'Ł',
                            'M': 'Ṃ',
                            'N': 'Ɲ',
                            'O': 'Ơ',
                            'P': 'Ƥ',
                            'Q': 'Q',
                            'R': 'Ʀ',
                            'S': 'Ƨ',
                            'T': 'Ŧ',
                            'U': 'Ʋ',
                            'V': 'V',
                            'W': 'Ɯ',
                            'X': 'X',
                            'Y': 'Ƴ',
                            'Z': 'Ȥ'
                        };
                        const fancyText = [...m.content].map(letter => fancyFonts[letter.toUpperCase()] || letter).join('');
                    const embed3 = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle('Your TXN In-Game Name')
                        .setDescription('Copy this name and use it in the game:\n(note: you can change the content after the TXN tag but the tag must not be changed, which is provided by me.)')
                        .addFields({ name: 'Formatted Name', value: `ŦXƝ ${fancyText}` })
                        .addFields({ name: 'how to use', value: `\`Username:\` ŦXƝ (tag) + ${m.content} (${fancyText})` })
                        .setFooter({ text: 'Long press on (Formatted Name) to copy!' });


                    message.author.send({
                        embeds: [embed3],
                        content: `long press to copy =>  ɨ ŦXƝ ${fancyText} ɨ`
                    });

                    const embed4 = new EmbedBuilder()
                        .setColor('Green')
                        .setTitle('New User Applied')
                        .setDescription(`user: <@${message.author.id}>\nuserID: ${message.author.id}`)
                        .addFields({ name: 'In-game Name (Plain Text):', value: `${m.content}` })
                        .addFields({ name: `In-game Name (With 'ŦXƝ' Tag):`, value: `ŦXƝ ${fancyText}` });

                    
                    channel.send({ embeds: [embed4] });

                    // collector.stop();
                });
            });

                const userId = message.author.id;

                // Check if the user exists in the database
                const userExists = db.has({ key: `reg_${userId}` });
                const embed5 = new EmbedBuilder()
                    .setColor('Random')
                    .setDescription('Seems like you are a new person trying to join the txn clan, i gave you the clan tag above, please change your existing in-game name with that new name given by me, and send me a screenshot of your game lobby, with that new name used.\n**Send it here in this DM**')
                    .setFooter({ text: 'You have 60 minutes to respond.' });

                    // message.author.send({ embeds: [embed5] });
                    if (userExists) {
                        // User exists in the database
                        console.log(`User ${userId} was found in the database.`);
                    } else {
                        // User does not exist in the database
                        console.log(`User ${userId} was not found in the database.`);
                    }



            // dm.channel.send({ content: `<@${message.author.id}>`, embeds: [embed] });

        } else if (!message.member.roles.cache.has(role1) || !message.member.roles.cache.has(role2) || !message.member.roles.cache.has(role3)) {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('You are not allowed to further proceed as you do not match the requirements');
            message.react('❌').then(() => message.react('❌'));

            return message.reply({ content: `<@${message.author.id}>`, embeds: [embed] });
        }
    }
}