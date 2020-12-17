const Discord = require('discord.js')
module.exports = {
  name: 'coin',
  description: ':flying_disc: Flip a Coin',
  aliases: ['flip', 'c'],
  execute (props) {
    const { msg, args } = props

    const answers = [
      'Heads',
      'Tails'
    ]

    const index = Math.floor(Math.random() * answers.length)

    const embed = new Discord.MessageEmbed()
      .setTitle(':flying_disc: Flip a Coin')
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
      .setDescription(`${msg.author} flipped a coin`)
      .addField(
        'The Result:',
        answers[index]
      )

    msg.channel.send(embed)
  }
}
