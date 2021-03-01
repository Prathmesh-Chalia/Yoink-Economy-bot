const Discord = require('discord.js');
//
const client = new Discord.Client();

client.config = require('./config/client.json');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handler/${handler}`)(client, Discord)
})


//mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Prathmesh:prathmesh07@yoink.vxcvy.mongodb.net/Yoink?retryWrites=true&w=majority' , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify : false
}).then(() => {
console.log('Connected to mongoose')
}).catch((err) => {
  console.log(err)
})


//economy system
const mongoCurrency = require('discord-mongo-currency-fork');

mongoCurrency.connect('mongodb+srv://Prathmesh:prathmesh07@yoink.vxcvy.mongodb.net/Yoink?retryWrites=true&w=majority');

client.login(client.config.token);

