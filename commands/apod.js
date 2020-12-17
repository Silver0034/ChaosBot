const apod = require('../functions/apod')

module.exports = {
  name: 'apod',
  description: ':space_invader: Get NASA\'s Astronomy Picture of the Day',
  aliases: ['nasa'],
  usage: '[a date | set]',
  execute (props) {
    const { msg, args, connection } = props

    // get astronomy picture of the day
    const data = {
      channel: msg.channel,
      client: msg.client,
      connection: connection
    }

    if (args[0] && args[0] === 'set') {
      // set the channel for the server
      if (msg.member.hasPermission('ADMINISTRATOR')) {
        let query = `INSERT INTO guilds (id, name, apod_channel_id)
        VALUES
      `
        // add variables to query
        query += `("${msg.guild.id}", "${msg.guild.name}", "${msg.channel.id}")`
        query += `
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        apod_channel_id = VALUES(apod_channel_id)`

        connection.query(query, (err) => {
          if (err) {
            console.log('error showing table: ', err)
            msg.channel.send('There was an error setting the default channel for APOD')
          } else {
            msg.channel.send('Success! The NASA APOD will now be posted in this channel.')
          }
        })
      } else {
        msg.channel.send('You have to be an administrator to set the default APOD channel')
      }
      return
    }

    if (args[0]) {
      data.target = args[0]
    }

    // get apod
    apod.command(data)
  }
}
