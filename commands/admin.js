module.exports = {
  name: 'admin',
  description: ':gear: Server Settings',
  usage: '[apod | holiday]',
  guildOnly: true,
  args: true,
  execute (props) {
    const { msg, args, connection } = props

    // only allow admins to use this command
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      return msg.channel.send('You have to be an administrator to change server settings')
    }

    if (args[0] === 'apod') {
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
      return
    }

    if (args[0] === 'holiday') {
      let query = `INSERT INTO guilds (id, name, holiday_channel_id)
        VALUES
      `
      // add variables to query
      query += `("${msg.guild.id}", "${msg.guild.name}", "${msg.channel.id}")`
      query += `
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        holiday_channel_id = VALUES(holiday_channel_id)`

      connection.query(query, (err) => {
        if (err) {
          console.log('error showing table: ', err)
          msg.channel.send('There was an error setting the default channel for holidays')
        } else {
          msg.channel.send('Success! Holidays will now be posted in this channel.')
        }
      })
    }
  }
}
