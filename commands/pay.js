const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
    name: "pay",
    cooldown: 5,
    aliases: ["give"],
    description: "pay another user using this",
    async execute(client, message, args, Discord) {
        const user = await mongoCurrency.findUser(message.author.id, message.guild.id);

        if(!user) return message.channel.send('Please use \`$create\` to create an account')

        const mentionedMember = message.mentions.members.first();

        if(!mentionedMember) return message.channel.send('You must state a valid member to pay')

        const target = await mongoCurrency.findUser(mentionedMember.id, message.guild.id);
    
        if(!target) return message.channel.send('Member not found')

        const amount = args[1];

        if(!args[1]) return message.channel.send('You must state a amount to pay')
        if(isNaN(amount)) return message.channel.send('The amount stated must be a number')
        if(amount > user.coinsInWallet) return message.channel.send('You cant pay more money than you currently have')
        if(mentionedMember.id === message.author.id) return message.channel.send('You stupid')
        mongoCurrency.deductCoins(message.author.id, message.guild.id, amount);

        mongoCurrency.giveCoins(mentionedMember.id, message.guild.id, amount);
    
        message.reply(`You sucessfully payed ${amount} to ${mentionedMember}`);
    }

}