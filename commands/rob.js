const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
    name: "rob",
    cooldown: 120,
    aliases: ["steel"],
    description: "rob anotehr user",
    async execute(client, message, args, Discord) {
        const user = await mongoCurrency.findUser(message.author.id, message.guild.id);

        if(!user) return message.channel.send('Please use \`$create\` to create an account')

        const mentionedMember = message.mentions.members.first();

        if(!mentionedMember) return message.channel.send('You must state a valid member to rob')

        const target = await mongoCurrency.findUser(mentionedMember.id, message.guild.id);
    
        if(!target) return message.channel.send('Member not found')

        if(user.coinsInWallet < 500) return message.channel.send('You do not have enough money to rob someone');
        if(target.coinsInWallet < 500) return message.channel.send('The member you are trying to rob dosnt have enough money');

        let rand = Math.floor(Math.random() * 3) + 1

     if (rand === 2) {
        let targetCoin = target.coinsInWallet

        let randomPercent = Math.floor(Math.random() * 99) + 1

        let coinsToDeduct = Math.floor(randomPercent/100 * targetCoin)

        mongoCurrency.deductCoins(mentionedMember.id, message.guild.id, coinsToDeduct);
        mongoCurrency.giveCoins(message.author.id, message.guild.id, coinsToDeduct);

        message.channel.send(`Pog, you robbed ${coinsToDeduct}, from ${mentionedMember}`)
    } else {
        mongoCurrency.deductCoins(message.author.id, message.guild.id, 500);
        message.channel.send('Sad, you failed to rob the member and lost 500 coins');
    }

    }
}