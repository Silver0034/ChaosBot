'use strict'

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const schedule = require('node-schedule')

// secrets
const { prefix, token } = require('./secret.json')

// external functions
const db = require('./functions/database')
const reactions = require('./functions/reactions')
const activity = require('./functions/activity')
const apod = require('./functions/apod')

// * scheduled jobs
// every 5 minutes
schedule.scheduleJob('*/5 * * * *', () => {
  activity.execute(client)
})
// every morning at 8am
schedule.scheduleJob('0 8 * * *', () => {
  // get astronomy picture of the day
  apod.execute({
    client: client,
    connection: db.connection
  })
})

// get all external command files
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

// cooldowns
const cooldowns = new Discord.Collection()

// include external command files
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`${client.user.tag} is logged in and ready`)
  // update db tables
  db.execute(client)

  // set activity
  activity.execute(client)

  // post daily apod if after time to post
  const startHour = new Date().getHours()
  if (startHour > 8) {
    // get astronomy picture of the day
    apod.execute({
      client: client,
      connection: db.connection
    })
  }
})

client.on('message', msg => {
  // add reactions to things that aren't commands

  // don't process non-commands or messages from bots
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    reactions.execute(msg)
    return
  }

  // split into arguments on space
  const args = msg.content.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  // * select the proper command
  const command = client.commands.get(commandName) ||
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    // quit if no command found
  if (!command) return

  // * check if command can be run in current channel
  if (command.guildOnly && msg.channel.type === 'dm') {
    return msg.reply('I can\'t execute that command inside DMs!')
  }

  // * set cooldowns to prevent spam
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }
  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  // defaults to 3 seconds
  const cooldownAmount = (command.cooldown || 3) * 1000
  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
    }
  }
  timestamps.set(msg.author.id, now)
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)

  // * check if args are required / exist
  if (command.args && !args.length) {
    let reply = `You did not provide the required arguments, ${msg.author}!`
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
    }
    return msg.channel.send(reply)
  }

  // * start typing
  msg.channel.startTyping()

  // * execute the command
  try {
    command.execute({
      msg: msg,
      args: args,
      connection: db.connection
    })
  } catch (err) {
    console.error(err)
    msg.reply('There was an error executing that command.')
  }

  // * delete the user's command
  msg.delete().catch(() => {
    /* do nothing because permissions issue */
  })

  // stop typing
  msg.channel.stopTyping()
})

client.login(token)
