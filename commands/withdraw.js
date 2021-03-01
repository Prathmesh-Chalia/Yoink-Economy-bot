const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
    name: "withdraw",
    cooldown: 5,
    aliases: ["with"],
    description: "withdraw money from bank",
    async execute(client, message, args, Discord) {
        const user = await mongoCurrency.findUser(message.author.id, message.guild.id);

        if(!user) return message.channel.send('Please use \`$create\` to create an account')

        let amount = args[0]

        if(!args[0]) return message.channel.send('You must state a amount to withdraw')

        if(amount === "max"){
         amount = user.coinsInBank
        }

        if(isNaN(amount)) return message.channel.send('The amount stated must be a number')
        if(amount > user.coinsInBank) return message.channel.send('You cant withdraw more money than you currently have in the bank')
        mongoCurrency.withdraw(message.author.id, message.guild.id, amount)
        message.reply(`You have sucessfully withdrawn ${amount} coins`)
    }
}