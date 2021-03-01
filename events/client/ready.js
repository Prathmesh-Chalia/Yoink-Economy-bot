const status = require('../../config/status.json');

module.exports = (Discord, client, message) => {

  let serversIN = client.guilds.cache.size

    console.log(`${client.user.tag} is now online.`)

    let i = 0;
    setInterval(async () => {
      const nameArray = [serversIN + " servers", "$bal"]
    const typeArray = ["WATCHING", "WATCHING"]
      client.user.setPresence({
        activity: {
          name: `${nameArray[i]}`,
          type: `${typeArray[i]}`,
        },
        status: 'dnd'
      })
  
      if (i < (nameArray.length - 1)) {
        i++
      } else {
        i = 0
      }
    }, 60 * 1000)
  
}