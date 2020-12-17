const { prefix } = require('../secret.json')
const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: ':helmet_with_cross: Get a list of all my commands, or get help with a specific command',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute (msg, args) {
    const { commands } = msg.client
    const embed = new Discord.MessageEmbed()
      .setColor('#43b581')
      .setAuthor(
        msg.client.user.username,
        msg.client.user.avatarURL()
      )
      .setFooter(
    `General Chaos™ | © ${new Date().getFullYear()}`,
    'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
      )
      .setTimestamp()

    // * list all commands
    if (!args.length) {
      embed
        .setTitle(':helmet_with_cross: Help:')
        .setDescription(`Below is a list of every command that I know\n\nYou can send \`${prefix}help [command name]\` to learn more about how to use a specific command.`)

      commands.map(command => embed.addField(
        `${prefix}${command.name}`,
        command.description ? command.description : command.name))

      return msg.author.send(embed)
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

    embed
      .setTitle(`:helmet_with_cross: Help: ${prefix}${command.name}`)

    if (command.aliases) embed.addField('Aliases:', `${prefix}${command.aliases.join(`, ${prefix}`)}`)
    if (command.description) embed.addField('Description:', command.description)
    if (command.usage) embed.addField('Usage:', `${prefix}${command.name} ${command.usage}`)
    if (command.cooldown) embed.addField('Cooldown:', `${command.cooldown || 3} second(s)`)

    msg.channel.send(embed)
  }
}
