module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Client ID: ${client.user.id}`);
        console.log('--------------------------------');
        console.log(`Client Type: ${client.user.bot}`);
        console.log('--------------------------------');
        console.log(`Client Name: ${client.user.username}`);
        console.log('------------------------------------');
        console.log(`Ready! Logged in as ${client.user.tag} and online!`);
        console.log('------------------------------------');
    }
}