const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
    name: "beg",
    cooldown: 5,
    alias: [],
    description: "beg for money",
    async execute(client, message, args, Discord) {

        let user = await mongoCurrency.findUser(message.author.id, message.guild.id);

        if (!user) return message.channel.send('Please use \`$create\` to create an account')

        const randomCoins = Math.floor(Math.random() * 999) + 1; 

        await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins);

        return message.reply(`You begged and recieved ${randomCoins} coins`)
    }
}
