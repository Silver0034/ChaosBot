const Discord = require('discord.js')

function rollDice (count, size) {
  let i; const RESULTS = []
  for (i = 0; i < count; i += 1) {
    // for each roll
    RESULTS[i] = Math.floor(Math.random() * size) + 1
  }
  return RESULTS.sort((a, b) => b - a)
}

module.exports = {
  name: 'roll',
  description: ':game_die: Roll a die (or dice!)',
  usage: '<# of dice>d<# of sides>',
  execute (msg, args) {
    // roll a die
    const arg = args[0] ? args[0] : '1d20'
    const embed = new Discord.MessageEmbed()
      .setTitle(':game_die: Roll Dice')
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

    // * check arg
    if (!arg.match(/^[d\d+-]*$/)) return msg.reply('Your dice syntax is invalid.')

    // * split each section at the operators
    const data = arg.split(/(?=\+)|(?=-)/g)

    // get the results of each section
    let total = 0
    const results = data.map(roll => {
      const rollParameters = roll.split('d')
      let value
      if (rollParameters.length === 2) {
        const result = rollDice(Math.abs(rollParameters[0]), rollParameters[1])
        value = result.reduce((a, b) => a + b, 0)
        total += (value * Math.sign(rollParameters[0]))
      } else {
        value = Math.abs(roll)
      }

      embed
        .addField(
          roll,
          `\`${value}\``
        )
    })

    embed
      .setDescription(`${msg.author} rolled __**${total}**__`)

    msg.channel.send(embed)
  }
}
