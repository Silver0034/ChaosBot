const Discord = require('discord.js')
module.exports = {
	name: 'invite',
	description: ':link: Invite me to your server',
	cooldown: 10,
	execute(props) {
		const { msg } = props

		const url = `https://discord.com/api/oauth2/authorize?client_id=${msg.client.user.id}&permissions=8&scope=bot`

		const embed = new Discord.MessageEmbed()
			.setTitle(':link: Invite')
			.setColor('#43b581')
			.setAuthor(msg.client.user.username, msg.client.user.avatarURL())
			.setFooter(
				`General Chaos™ | © ${new Date().getFullYear()}`,
				'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
			)
			.setTimestamp()
			.setDescription(
				`[Click here to invite ${msg.client.user.username} to your server](${url})`
			)

		msg.channel.send(embed)
	}
}
