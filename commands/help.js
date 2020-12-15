const { prefix } = require('../secret.json')

module.exports = {
  name: 'help',
  description: 'Get a list of all my commands, or get help with a specific command',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute (msg, args) {
    const data = []
    const { commands } = msg.client

    // * list all commands
    if (!args.length) {
      data.push('Here\'s a list of all my commands:')
      data.push(commands.map(command => command.name).join(', '))
      data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command.`)

      return msg.author.send(data, { split: true })
        .then(() => {
          if (msg.channel.type === 'dm') return
          msg.reply('I\'ve send you a DM with all of my commands.')
        })
        .catch(err => {
          console.error(`Could not send help DM to ${msg.author.tag}.\n`, err)
          msg.reply('I\'m having trouble sending you a DM. Do you have DMs disabled?')
        })
    }

    // * help with a specific command
    const name = args[0].toLowerCase()
    const command = commands.get(name) ||
      commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))

    if (!command) {
      return msg.reply('That is not a valid command')
    }

    data.push(`**Name:** ${command.name}`)

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description) data.push(`**Description:** ${command.description}`)
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    msg.channel.send(data, { split: true })
  }
}
