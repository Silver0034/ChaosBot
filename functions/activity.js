module.exports = {
  execute (client) {
    // pick a status
    const list = [
      {
        type: 'LISTENING',
        activity: 'commands'
      },
      {
        type: 'LISTENING',
        activity: '/ping'
      },
      {
        type: 'LISTENING',
        activity: 'screams for /help'
      },
      {
        type: 'WATCHING',
        activity: 'you'
      },
      {
        type: 'LISTENING',
        activity: 'your commands'
      },
      {
        type: 'WATCHING',
        activity: 'the latest Astronomy Picture of the Day'
      },
      {
        type: 'WATCHING',
        activity: 'Jurassic Park... again'
      },
      {
        type: 'PLAYING',
        activity: 'the waiting game'
      },
      {
        type: 'COMPETING',
        activity: `${new Date().getFullYear()} bot of the year`
      }
    ]
    const index = Math.floor(Math.random() * list.length)
    client.user.setActivity(list[index].activity, { type: list[index].type })
  }
}
