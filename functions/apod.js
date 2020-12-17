const { NASA } = require('../secret.json')
const Discord = require('discord.js')
const axios = require('axios')

function formatDate (date) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) { month = '0' + month }
  if (day.length < 2) { day = '0' + day }

  return [year, month, day].join('-')
}

function createEmbed (client, apod) {
  const embed = new Discord.MessageEmbed()
    .setTitle(':space_invader: Astronomy Picture of the Day')
    .setColor('#43b581')
    .setAuthor(
      client.user.username,
      client.user.avatarURL()
    )
    .setFooter(
      `General Chaos™ | © ${new Date().getFullYear()}`,
      'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
    )
    .setTimestamp()
    .setDescription(apod.title)
    .setThumbnail(apod.url)
    .setImage(apod.hdurl)
  if (apod.media_type === 'video') {
    embed.setURL(apod.url)
  } else {
    embed.setURL(apod.hdurl)
  }

  if (apod.explanation.length >= 1024) {
    embed
      .addField(
        'Explanation:',
        apod.explanation.substring(0, 1000) + '...'
      )
  } else {
    embed.addField(
      'Explanation:',
      apod.explanation
    )
  }
  const d = new Date(apod.date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getUTCDate()
  const year = '' + d.getFullYear()

  if (month.length < 2) { month = '0' + month }
  if (day.length < 2) { day = '0' + day }

  const linkDate = `${year.slice(-2)}${month}${day}`
  embed.addField(
    'View NASA\'s APOD Page',
  `[Click here](https://apod.nasa.gov/apod/ap${linkDate}.html) to view the full original page`
  )

  if (apod.copyright) {
    embed.setFooter(`Copyright: ${apod.copyright}`)
  }

  return embed
}

async function getAPOD (props) {
  const { target } = props
  const date = target ? formatDate(target) : formatDate(new Date())
  const today = formatDate(new Date())

  // return saved apod if it apod is set and matches target date
  if (module.exports.apod && module.exports.apod.date === date) return module.exports.apod

  // send a GET request for the image of the selected date
  const data = {
    api_key: NASA.Password,
    date: date,
    hd: true
  }
  const host = 'https://api.nasa.gov'
  const path = '/planetary/apod'

  const args = Object.keys(data)
    .map(key => `${key}=${data[key]}`)
    .join('&')

  try {
    const response = await axios({
      method: 'get',
      url: `${host}${path}?${args}`
    })

    // if the date is the current date save object
    if (response.data.date === today) {
      module.exports.apod = response.data
    }
    // return apod
    return response.data
  } catch (err) {
    return { success: false }
  }
}

module.exports = {
  apod: null,
  command (props) {
    const { client, channel } = props
    getAPOD(props).then((apod) => {
      if (!apod || apod.success === false) {
        channel.send('There was an error getting the APOD')
        return false
      }
      const embed = createEmbed(client, apod)
      channel.send(embed)
    })
  },
  execute (props) {
    const { client, connection } = props
    getAPOD(props).then((apod) => {
      connection.query('SELECT id, name, apod_channel_id, apod_date FROM guilds', (err, results) => {
        if (err) {
          console.log('Error with daily APOD from DB: ', err)
          return
        }

        const embed = createEmbed(client, apod)

        results.map(result => {
          // send a embed to each individual channel
          if (
            apod &&
            result.apod_channel_id &&
            result.apod_date !== apod.date
          ) {
            // hasn't already set a embed today
            client.channels.cache.get(result.apod_channel_id).send(embed)

            // add to db that it was sent
            let query = `INSERT INTO guilds (id, name, apod_date)
                    VALUES
                  `
            query += `("${result.id}", "${result.name}", "${apod.date}")`
            query += `
                  ON DUPLICATE KEY UPDATE
                  name = VALUES(name),
                  apod_date = VALUES(apod_date)`

            connection.query(query, (err) => {
              if (err) {
                console.log('Error saving apod_date: ', err)
              }
            })
          }
          return true
        })
      })
    })
  }
}
