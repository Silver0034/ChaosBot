const Discord = require('discord.js')
const axios = require('axios')

function createEmbed (msg, quote) {
  const embed = new Discord.MessageEmbed()
    .setTitle(':thought_balloon: Kanye Says')
    .setColor('#43b581')
    .setAuthor(
      msg.client.user.username,
      msg.client.user.avatarURL()
    )
    .setFooter(
      `General Chaos™ | © ${new Date().getFullYear()} | Thanks to api.kanye.rest`,
      'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
    )
    .setTimestamp()
    .setDescription(`${msg.author} | ${quote.quote}`)

  return embed
}

async function getQuote () {
  // send a get request
  const host = 'https://api.kanye.rest/'

  const response = await axios({
    method: 'get',
    url: host
  })

  return response.data
}

module.exports = {
  name: 'kanye',
  description: ':thought_balloon: Get a quote from Kanye',
  aliases: ['yeezus'],
  execute (props) {
    const { msg } = props
    getQuote().then((quote) => {
      if (!quote || quote.quote === false) {
        msg.channel.send('Kanye was unavailable for comment at this time.')
        return false
      }
      const embed = createEmbed(msg, quote)
      msg.channel.send(embed)
    })
  }
}
