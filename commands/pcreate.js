const mongoCurrency = require('discord-mongo-currency-fork');
module.exports = {
    name: "pcreate",
    cooldown: 5,
    aliases: ["create", "signup", "aprofile"],
    description: "create an acc",
    async execute(client, message, args, Discord) {
        const user = await mongoCurrency.findUser(message.author.id, message.guild.id);
    
        if (!user) {

            await mongoCurrency.giveCoins(message.member.id, message.guild.id, 1000);

            message.channel.send('Your profile was sucessfully created')
           

        } else {
            message.channel.send('Your profile is already created')
           
        }
        
    }
}