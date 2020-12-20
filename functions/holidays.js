const { HolidayKey } = require('../secret.json')
const Discord = require('discord.js')
const axios = require('axios')

async function getHoliday () {
  const d = new Date()
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) { month = '0' + month }
  if (day.length < 2) { day = '0' + day }

  // send a GET request for the image of the selected date
  const data = {
    api_key: HolidayKey,
    country: 'US',
    day: day,
    month: month,
    year: year
  }
  const host = 'https://calendarific.com'
  const path = '/api/v2/holidays'

  const args = Object.keys(data)
    .map(key => `${key}=${data[key]}`)
    .join('&')

  try {
    const response = await axios({
      method: 'get',
      url: `${host}${path}?${args}`
    })

    // save object
    module.exports.holidays = response.data.response.holidays

    // return apod
    return response.data.response.holidays
  } catch (err) {
    return { success: false }
  }
}

function createEmbed (client, holidays) {
  const holiday = holidays[0]
  const embed = new Discord.MessageEmbed()
    .setTitle(`:calendar_spiral: ${holiday.name}`)
    .setColor('#43b581')
    .setAuthor(
      client.user.username,
      client.user.avatarURL()
    )
    .setFooter(
      `General Chaos™ | © ${new Date().getFullYear()} | Thanks to calendarific.com`,
      'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
    )
    .setTimestamp()
    .setDescription(holiday.description)

  return embed
}

module.exports = {
  holiday: {},
  execute (props) {
    const { client, connection } = props
    getHoliday().then((holidays) => {
      connection.query('SELECT id, name, holiday_channel_id, holiday_date FROM guilds', (err, results) => {
        if (err) {
          console.log('Error with holidays from DB: ', err)
          return
        }

        // don't send if not a holiday
        if (holidays.length === 0) return

        console.log(results)

        const embed = createEmbed(client, holidays)

        results.map(result => {
          // send a embed to each individual channel
          if (
            result.holiday_channel_id &&
            result.holiday_date !== holidays[0].date.iso
          ) {
            // hasn't already set a embed today
            client.channels.cache.get(result.holiday_channel_id).send(embed)

            // add to db that it was sent
            let query = `INSERT INTO guilds (id, name, holiday_date)
                    VALUES
                  `
            query += `("${result.id}", "${result.name}", "${holidays[0].date.iso}")`
            query += `
                  ON DUPLICATE KEY UPDATE
                  name = VALUES(name),
                  holiday_date = VALUES(holiday_date)`

            connection.query(query, (err) => {
              if (err) {
                console.log('Error saving holiday_date: ', err)
              }
            })
          }
          return true
        })
      })
    })
  }
}
