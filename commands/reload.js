module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  args: true,
  execute (msg, args) {
    // * get command
    const commandName = args[0].toLowerCase()
    const command = msg.client.commands.get(commandName) ||
    msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    // ! stop if command doesn't exist
    if (!command) return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`)

    // * delete the command from cache
    delete require.cache[require.resolve(`./${command.name}.js`)]

    // * re-require the file to reload the command
    try {
      const newCommand = require(`./${command.name}.js`)
      msg.client.commands.set(newCommand.name, newCommand)
      msg.channel.send(`Command \`${command.name}\` was reloaded!`)
    } catch (err) {
      console.error(err)
      msg.channel.send(`There was an error while reloading the \`${command.name}\` command.`)
    }
  }
}
