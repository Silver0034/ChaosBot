const Discord = require('discord.js')
module.exports = {
	name: '8-ball',
	description: ':8ball: Receive a prediction for your yes or no questions ',
	aliases: ['8ball', '8b'],
	usage: '[Your yes or no question]',
	args: true,
	execute(props) {
		const { msg, args } = props

		const answers = [
			'As I see it, yes.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
			'Don’t count on it.',
			'It is certain.',
			'It is decidedly so.',
			'Most likely.',
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Outlook good.',
			'Reply hazy, try again.',
			'Signs point to yes.',
			'Very doubtful.',
			'Without a doubt.',
			'Yes.',
			'Yes – definitely.',
			'You may rely on it.'
		]

		const index = Math.floor(Math.random() * answers.length)

		const question = args.join(' ')

		const embed = new Discord.MessageEmbed()
			.setTitle(':8ball: Magic 8-Ball')
			.setColor('#43b581')
			.setAuthor(msg.client.user.username, msg.client.user.avatarURL())
			.setFooter(
				`General Chaos™ | © ${new Date().getFullYear()}`,
				'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
			)
			.setTimestamp()
			.setDescription(`${msg.author} asked:  *${question}*`)
			.addField(
				answers[index],
				"Please note that **I AM INDEED MAGICAL** and all of predictions are 100% fo-sho going to happen\n(unless they don't)"
			)

		msg.channel.send(embed)
	}
}
