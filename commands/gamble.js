const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
name: "gamble",
cooldown: 11,
aliases: ["bet"],
description: "Shows the balance ofthe user",
async execute(client, message, args ,Discord){
    const user = await mongoCurrency.findUser(message.author.id, message.guild.id);

    if(!user) return message.channel.send('Please use \`$create\` to create an account')

    let amount = args[0];

        if(!args[0]) return message.channel.send('You must state a amount to gamble')
        if(isNaN(amount)) return message.channel.send('The amount stated must be a number')
        if(amount > user.coinsInWallet) return message.channel.send('You cant gamble more money than you currently have')

    
    let rand = Math.floor(Math.random() * 5) + 1

     if (rand === 2) {
        

        let random_percent = Math.floor(Math.random() * 99) + 1

        let coins_to_add = Math.floor(random_percent/100 * amount)

        mongoCurrency.giveCoins(message.author.id, message.guild.id, coins_to_add);

        const won_embed = new Discord.MessageEmbed()
        .setTitle('You won the gamble')
        .addFields(
            {
                name : 'Amount won',
                value : coins_to_add
            },
            {
                name : 'Percentage of amount won',
                value : random_percent + '%'
            },
            {
                name : 'Current balance in the wallet',
                value : user.coinsInWallet + coins_to_add
            }
        )
        .setColor('RANDOM')
        .setThumbnail(message.author.displayAvatarURL({ dynamic : true }))
        .setTimestamp()
        .setFooter('Thanks for using this bot', client.user.displayAvatarURL());

            message.channel.send(won_embed)
     } else {
        const lost_embed = new Discord.MessageEmbed()
        .setTitle('You lost the gamble')
        .addFields(
            {
                name : 'Amount lost',
                value : amount
            },
            {
                name : 'Current balance in the wallet',
                value : user.coinsInWallet - amount
            }
        )
        .setColor('RANDOM')
        .setThumbnail(message.author.displayAvatarURL({ dynamic : true }))
        .setTimestamp()
        .setFooter('Thanks for using this bot', client.user.displayAvatarURL());

        message.channel.send(lost_embed);

        mongoCurrency.deductCoins(message.author.id, message.guild.id, amount);
     } 
}
}