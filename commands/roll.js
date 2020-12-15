module.exports = {
  name: 'roll',
  description: ':game_die: Roll a die (or dice!)',
  usage: '<# of dice>d<# of sides>',
  args: true,
  guildOnly: true,
  execute (msg, args) {
    msg.channel.send('Pong.')
  }
}
