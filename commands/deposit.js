const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
    name: "deposit",
    cooldown: 5,
    aliases: ["dep"],
    description: "guild leaderboard",
    async execute(client, message, args, Discord) {
        const user = await mongoCurrency.findUser(message.author.id, message.guild.id);

        if(!user) return message.channel.send('Please use \`$create\` to create an account')

        let amount = args[0]

        if(!args[0]) return message.channel.send('You must state a amount to deposit')

        if(amount === "max"){
            amount = user.bankSpace - user.coinsInBank
        }

        if(isNaN(amount)) return message.channel.send('The amount stated must be a number')
        if(amount > user.coinsInWallet) return message.channel.send('You cant deposit more money than you currently have')
        if(user.coinsInBank + amount > user.bankSpace)return message.channel.send('The value stated is greater than the actual limit')
        mongoCurrency.deposit(message.author.id, message.guild.id, amount)
        message.reply(`You sucessfully deposited ${amount} coins`)
    }
}