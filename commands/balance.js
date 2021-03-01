const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
name: "balance",
cooldown: 5,
aliases: ["bal"],
description: "Shows the balance ofthe user",
async execute(client, message, args ,Discord){
    const member = message.mentions.users.first() || message.author;

    const user = await mongoCurrency.findUser(member.id, message.guild.id);

    if(!user) return message.channel.send('Please use \`$create\` to create an account')

    const embed = new Discord.MessageEmbed()
    .setTitle(`${member.username}'s Balance 💸`)
    .addFields(
        {
            name: 'Wallet | 👛',
            value: user.coinsInWallet
        },
        {
            name: 'Bank | 🏦',
            value: `${user.coinsInBank}/${user.bankSpace}`
        },
        {
            name: 'Net Worth | 💰',
            value: user.coinsInBank + user.coinsInWallet
        }
    )
    .setColor('RANDOM')
    .setThumbnail(member.displayAvatarURL({ dynamic : true }))
    .setTimestamp()
    .setFooter('Thanks for using this bot', client.user.displayAvatarURL());
    
    message.channel.send(embed);
}}