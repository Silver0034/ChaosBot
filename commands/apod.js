const apod = require('../functions/apod')

module.exports = {
	name: 'apod',
	description: ":space_invader: Get NASA's Astronomy Picture of the Day",
	aliases: ['nasa'],
	usage: '[date]',
	execute(props) {
		const { msg, args, connection } = props

		// get astronomy picture of the day
		const data = {
			channel: msg.channel,
			client: msg.client,
			connection: connection
		}

		if (args[0]) {
			data.target = args[0]
		}

		// get apod
		apod.command(data)
	}
}
