module.exports = {
  name: 'ping',
  description: ':ping_pong: I may or may not say "pong".',
  aliases: ['pong'],
  cooldown: 1,
  execute (msg, args) {
    switch (Math.round(Math.random() * 10)) {
      case (1):
      case (2):
      case (3):
        return msg.channel.send('... no.')
      case (4):
        return msg.channel.send('I don\'t want to say that.')
      case (5):
        return msg.channel.send('... no, I don\'t think I will say that.')
      case (9):
        return msg.channel.send('Pong.')
      case (10):
        return msg.channel.send('**PONG!!!**')
      default:
        return msg.channel.send('...')
    }
  }
}
