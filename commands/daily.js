const mongoCurrency = require('discord-mongo-currency-fork');
const cooldowns = new Map();
const ms = require('ms')
module.exports = {
    name: "daily",
    cooldown: 0,
    aliases: ["d"],
    description: "daily rewards",
    async execute(client, message, args, Discord) {
        const timeToWait = ms('1d');
        const now = Date.now()
        const expirationTime = cooldowns.get(message.author.id) + timeToWait
        message.delete({timeout: ms(`10s`)})
        if (now < expirationTime) {
          const timeLeft = ms(expirationTime - now) 

          return message.channel.send(`You have alredy claimed your daily reward, come back after ${timeLeft}`).then(msg=>{msg.delete({timeout:ms(`10s`)})})
      }

        let user = await mongoCurrency.findUser(message.author.id, message.guild.id);

        if (!user) return message.channel.send('Please use \`$create\` to create an account')

        const randomCoins = Math.floor(Math.random() * 9999) + 1

        await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins);

         message.reply(`You were given ${randomCoins} coins, run this command again after 24 hours to claim your next daily reward`)
     
         cooldowns.set(message.author.id, now)
         setTimeout(() => cooldowns.delete(message.author.id), timeToWait) 
    }
}