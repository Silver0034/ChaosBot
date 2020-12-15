module.exports = {
  name: 'ping',
  description: 'I\'ll say pong.',
  aliases: ['pong'],
  execute (msg, args) {
    msg.channel.send('Pong!')
  }
}
