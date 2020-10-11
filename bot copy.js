'use strict'
const DISCORD = require('discord.js')
const CLIENT = new DISCORD.Client()
const FS = require('fs')

// extra node package managers
const AXIOS = require('axios')
const SCHEDULE = require('node-schedule')

var mysql = require('mysql')
var db = 'chaos_db'

// get bot secrets
const SECRET = JSON.parse(
  FS.readFileSync('secret.json')
)

// external files for command functions
const RPG = require('./functions/rpg')
const rpg = require('./functions/rpg')
const { parse } = require('path')
const { timeStamp } = require('console')

// * functions for individual commands
function updateGuildsDB () {
  let query = `INSERT INTO guilds (id, name)
  VALUES
  `
  const args = []
  CLIENT.guilds.cache.map(guild => {
    args.push(`("${guild.id}", "${guild.name}")`)
  })
  // add variables to query
  query += args.join(`,
`)
  query += `
ON DUPLICATE KEY UPDATE
  name = VALUES(name)`

  CONNECTION.query(query, (err) => {
    if (err) {
      console.log('error showing table: ', err)
    }
  })
}
function generateEmbed (title = ':thought_balloon: Embed Title!') {
  const embed = new DISCORD.MessageEmbed()
    .setTitle(title)
    .setColor('#43b581')
    .setAuthor(
      CLIENT.user.username,
      CLIENT.user.avatarURL()
    )
    .setFooter(
    `General Chaos™ | © ${new Date().getFullYear()}`,
    'https://cdn.discordapp.com/icons/227552928343392256/051a39fd0c470e72a9ff52c0ddb08bf6.webp?size=256'
    )
    .setTimestamp()

  return embed
}

// make api calls
var apod
// get nasa picture of the day
async function getSpacePhoto (props = {}) {
  const date = new Date()
  const todayString = `${
    date.getFullYear()
  }-${
    ('0' + (date.getMonth() + 1)).slice(-2)
  }-${
    ('0' + date.getDate()).slice(-2)
  }`

  // get target date string if target date is set
  let targetString
  if (props.targetDate) {
    // get date of target date
    const target = new Date(props.targetDate)

    targetString = `${
      target.getFullYear()
    }-${
      ('0' + (target.getMonth() + 1)).slice(-2)
    }-${
      ('0' + target.getDate()).slice(-2)
    }`
  } else {
    targetString = todayString
  }

  if (apod && apod.date === targetString) {
    // already have APOD. send it again
    return apod
  } else {
    // send a GET request
    const data = {
      api_key: SECRET.NASA.Password,
      date: targetString,
      hd: true
    }

    const host = 'https://api.nasa.gov'
    const path = '/planetary/apod'

    const args = Object.keys(data)
      .map(key => `${key}=${data[key]}`)
      .join('&')

    try {
      const response = await AXIOS({
        method: 'get',
        url: `${host}${path}?${args}`
      })

      const data = response.data
      // if the date is the current date save object
      if (data.date === todayString) {
        apod = data
      }
      return data
    } catch (err) {
      return { success: false }
    }
  }
}
function postSpacePhoto () {
  getSpacePhoto().then(() => {
    CONNECTION.query('SELECT id, name, apod_channel_id, apod_date FROM guilds', (err, results) => {
      if (err) {
        console.log('Error with daily APOD from DB: ', err)
        return
      }
      results.map(result => {
        // send a message to each individual channel
        if (result.apod_date !== apod.date) {
          // hasn't already set a message today
          const message = generateEmbed(':space_invader: Astronomy Picture of the Day')
            .setURL(apod.hdurl)
            .setDescription(apod.title)
            .setThumbnail(apod.url)
            .setImage(apod.hdurl)
            .addField(
              'Explanation:',
              apod.explanation
            )

          if (apod.copyright) {
            message.setFooter(`Copyright: ${apod.copyright}`)
          }
          CLIENT.channels.cache.get(result.apod_channel_id).send(message)

          let query = `INSERT INTO guilds (id, name, apod_date)
                  VALUES
                `
          query += `("${result.id}", "${result.name}", "${apod.date}")`
          query += `
                ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                apod_date = VALUES(apod_date)`

          CONNECTION.query(query, (err) => {
            if (err) {
              console.log('Error saving apod_date: ', err)
            }
          })
        }
      })
    })
  })
}
// post space photo
// SCHEDULE.scheduleJob('0 7 * * *', () => {
SCHEDULE.scheduleJob('51 21 * * *', () => {
  console.log('scheduled job running')
  postSpacePhoto()
})

const CONNECTION = mysql.createConnection({
  host: SECRET.MySQL.Token,
  user: SECRET.MySQL.User,
  password: SECRET.MySQL.Password
})

// create database if it does not exist
CONNECTION.query('CREATE DATABASE IF NOT EXISTS ??', db, (err, results) => {
  if (err) {
    console.log('error in creating database', err)
    return
  }

  // console.log('created a new database', db)

  // change user so I can modify database
  CONNECTION.changeUser({
    database: db
  }, (err) => {
    if (err) {
      console.log('error in changing database', err)
      return
    }

    // console.log('connected to database')

    // query string for creating a artist table
    // var table = ('CREATE TABLE IF NOT EXISTS Artist (id INT(100) NOT NULL AUTO_INCREMENT, name TINYTEXT, PRIMARY KEY(id))')

    const table = `CREATE TABLE IF NOT EXISTS guilds(
      id VARCHAR(25) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      apod_channel_id VARCHAR(25),
      apod_date VARCHAR(10)
    )`

    CONNECTION.query(table, (err) => {
      if (err) {
        console.log('error in creating table', err)
        return
      }

      console.log('Connected to database table')
    })

    // write all info from guilds table
    CONNECTION.query('SELECT * FROM guilds', (err) => {
      if (err) {
        console.log('error showing table: ', err)
      }
    })
  })
})

// log in to discord
CLIENT.login(SECRET.Discord.Token)
// on discord ready
CLIENT.on('ready', () => {
  console.log(`Logged in as ${CLIENT.user.tag}`)

  // update db on bot load
  updateGuildsDB()

  postSpacePhoto()
})

// Update db when joining servers or server/channel updates/deleted
CLIENT.on('guildCreate', () => {
  updateGuildsDB()
})
CLIENT.on('guildUpdate', () => {
  updateGuildsDB()
})
CLIENT.on('guildDelete', () => {
  updateGuildsDB()
})
CLIENT.on('channelUpdate', () => {
  updateGuildsDB()
})
CLIENT.on('channelDelete', () => {
  updateGuildsDB()
})

// on incoming message
CLIENT.on('message', msg => {
  // check if message starts with start character
  if (msg.content.charAt(0) === '/') {
    // get first word in message
    const ARGS = msg.content.toLowerCase().substr(1).split(' ')
    let response = null
    // object to send response to
    const TARGET = msg.guild ? msg.channel : msg.author
    // arguments to use in functions
    const PROPS = {}

    // get name of member
    PROPS.name = msg.guild ? msg.member.displayName : msg.author.username

    // run functions based on trigger
    switch (ARGS[0]) {
      case ('8-ball'):
      case ('8ball'):
        response = generateEmbed(':8ball: Magic 8-Ball')
        if (ARGS[1]) {
          // has a question
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

          const question = ARGS.slice(1).join(' ')

          response
            .setDescription(`${PROPS.name} asked:  *${question}*`)
            .addField(
              'The Answer:',
              answers[index]
            )
        } else {
          // show help
          response
            .setTitle(`${response.title} - Instructions`)
            .setDescription('Instructions to use the Magic 8-Ball')
            .addField(
              '/8ball [your question here]',
              'Have the Magic 8-Ball answer your yes-or-no questions via magic and a little bit of JavaScript. You can also use `/8-ball [your question here]`'
            )
        }
        TARGET.send(response)
        break
      case ('admin'):
        // check if message is in a server
        if (msg.guild) {
          // is in a server
          if (msg.member.hasPermission('ADMINISTRATOR')) {
            // author is admin
            switch (ARGS[1]) {
              case ('apod'):
                // set the channel as the default apod channel
                PROPS.query = `INSERT INTO guilds (id, name, apod_channel_id)
                  VALUES
                `
                // add variables to query
                PROPS.query += `("${msg.guild.id}", "${msg.guild.name}", "${msg.channel.id}")`
                PROPS.query += `
                ON DUPLICATE KEY UPDATE
                  name = VALUES(name),
                  apod_channel_id = VALUES(apod_channel_id)`

                CONNECTION.query(PROPS.query, (err) => {
                  response = generateEmbed(':closed_lock_with_key: Admin Commands')
                  if (err) {
                    console.log('error showing table: ', err)
                    response.setDescription('There was an error.')
                    return
                  } else {
                    response.setDescription('The NASA APOD will now be posted in this channel.')
                  }
                  TARGET.send(response)
                })
                break
              default:
                response = generateEmbed(':closed_lock_with_key: Admin Commands')
                  .setDescription('Admin Commands: Help')
                  .addField('/admin help', 'Get all possible admin commands')
                  .addField('/admin apod', 'Set the default channel for NASA\'s Astronomy Picture of the Day.')
                break
            }
            CONNECTION.query('SHOW tables', (err, tables) => {
              if (err) {
                console.log('error showing tables: ', err)
                return
              }
              console.log(tables)
            })
          } else {
            response = generateEmbed(':closed_lock_with_key: Admin Commands')
              .setDescription('These commands are only available for server administrators.')
          }
        } else {
          // is not in a server
          response = generateEmbed(':closed_lock_with_key: Admin Commands')
            .setDescription('These commands are only available within servers.')
        }
        if (response) {
          TARGET.send(response)
        }
        break
      case ('apod'):
        if (ARGS[1]) {
          PROPS.targetDate = ARGS[1]
        }
        getSpacePhoto(PROPS).then((data) => {
          if (data.success === false) {
            // failed
            response = generateEmbed(':space_invader: Astronomy Picture of the Day')
              .setDescription('There was an error retrieving the APOD')
          } else {
            response = generateEmbed(':space_invader: Astronomy Picture of the Day')
              .setURL(data.hdurl)
              .setDescription(data.title)
              .setThumbnail(data.url)
              .setImage(data.hdurl)
              .addField(
                'Explanation:',
                data.explanation
              )

            if (data.copyright) {
              response.setFooter(`Copyright: ${data.copyright}`)
            }
          }
          TARGET.send(response)
        })
        break
      case ('coin'):
        response = generateEmbed(':flying_disc: Flip a Coin')

        PROPS.options = [
          'Heads',
          'Tails'
        ]

        PROPS.index = Math.floor(Math.random() * PROPS.options.length)

        response
          .setDescription(`${PROPS.name} flipped a coin.`)
          .addField(
            'The Answer:',
            PROPS.options[PROPS.index]
          )

        TARGET.send(response)
        break
      case ('invite'):
        // send a link to invite bot to personal server
        PROPS.url = 'https://discord.com/api/oauth2/authorize?client_id=748232829577461932&permissions=8&scope=bot'
        response = generateEmbed(':link: Invite')
          .setURL(PROPS.url)
          .addField(
          `Invite ${CLIENT.user.username} to your server`,
          `[Click here to invite](${PROPS.url})`
          )
        TARGET.send(response)
        break
      case ('dnd'):
      case ('d&d'):
      case ('dd'):
        // contains most of the d&d commands
        response = generateEmbed(':scroll: Dungeons & Dragons')

        // if args[1], pick what d&d command to do
        // if not args[1] (or invalid) show instructions
        PROPS.string = ARGS[1] ? ARGS[1] : false
        switch (ARGS[1]) {
          // general info commands
          case ('class'):
          case ('classes'):
            PROPS.classTarget = ARGS[2] ? ARGS[2] : false
            PROPS.classKeys = Object.keys(RPG.classes)
            if (PROPS.classKeys.includes(PROPS.classTarget)) {
              // class is found
              PROPS.class = RPG.classes[PROPS.classTarget]
              response
                .setTitle(`${response.title} - ${PROPS.classTarget.charAt(0).toUpperCase() + PROPS.classTarget.slice(1)}`)
                .setURL(PROPS.class.url)
                .setDescription(`Information for the [${PROPS.classTarget}](${PROPS.class.url} 'Link to more information about ${PROPS.classTarget}') class`)
              PROPS.class = RPG.classes[PROPS.classTarget]
              response
                .addField(
                  'Ability Priorities',
                  `\`\`\`${PROPS.class.abilityPriority.join(', ')}\`\`\``
                )
            } else {
              // no class found, print the list
              response
                .setTitle(`${response.title} - Classes`)
                .addField(
                  'A list of 5e D&D classes',
                  `\`\`\`${PROPS.classKeys.sort().join(', ')}\`\`\``
                )
            }
            break
          case ('proficiency'):
          case ('proficiencies'):
          case ('prof'):
          case ('profs'):
            PROPS.profTarget = ARGS[2] ? ARGS.slice(2).join(' ') : false
            PROPS.profKeys = Object.keys(RPG.proficiencies)
            if (PROPS.profKeys.includes(PROPS.profTarget)) {
              // prof is found
              PROPS.prof = RPG.proficiencies[PROPS.profTarget]
              response
                .setTitle(`${response.title} - ${PROPS.profTarget.charAt(0).toUpperCase() + PROPS.profTarget.slice(1)}`)
                .setDescription(`Information for the ${PROPS.profTarget} proficiency`)
                .addField(
                  'Description',
                  `\`\`\`${(PROPS.prof.description) ? PROPS.prof.description : 'None'}\`\`\``,
                  true
                )
            } else {
              // no class found, print the list
              response
                .setTitle(`${response.title} - Proficiencies`)
                .addField(
                  'A list of 5e D&D Proficiencies',
                      `\`\`\`${PROPS.profKeys.sort().join(', ')}\`\`\``
                )
            }
            break
          case ('race'):
          case ('races'):
            PROPS.raceTarget = ARGS[2] ? ARGS[2] : false
            PROPS.raceKeys = Object.keys(RPG.races)
            if (PROPS.raceKeys.includes(PROPS.raceTarget)) {
              // race is found
              PROPS.race = RPG.races[PROPS.raceTarget]
              PROPS.abilityScores = ''
              for (const [key, value] of Object.entries(PROPS.race.abilityScoreBonus)) {
                if (PROPS.abilityScores.length > 0) {
                  PROPS.abilityScores += ', '
                }
                PROPS.abilityScores += `${key}: ${value}`
              }
              response
                .setTitle(`${response.title} - ${PROPS.raceTarget.charAt(0).toUpperCase() + PROPS.raceTarget.slice(1)}`)
                .setURL(PROPS.race.url)
                .setDescription(`Information for the [${PROPS.raceTarget}](${PROPS.race.url} 'Link to more information about ${PROPS.raceTarget}') race`)
                .addField(
                  'Ability Score Bonuses',
                  `\`\`\`${PROPS.abilityScores}\`\`\``,
                  true
                )
                .addField(
                  'Age Range',
                  `\`\`\`Child: ${PROPS.race.ageChild}, Adult: ${PROPS.race.ageAdult}\`\`\``,
                  true
                )
                .addField(
                  'Size',
                  `\`\`\`${(PROPS.race.size) ? PROPS.race.size : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Height',
                  `\`\`\`${PROPS.race.heightMin}ft - ${PROPS.race.heightMax}ft\`\`\``,
                  true
                )
                .addField(
                  'Speed',
                  `\`\`\`${PROPS.race.speed}\`\`\``,
                  true
                )
                .addField(
                  'Languages',
                  `\`\`\`${(PROPS.race.languages.length) ? PROPS.race.languages.join(', ') : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Sub-Races',
                  `\`\`\`${(PROPS.race.subRaces.length) ? PROPS.race.subRaces.join(', ') : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Proficiencies',
                  `\`\`\`${(PROPS.race.proficiencies.length) ? PROPS.race.proficiencies.join(', ') : 'None'}\`\`\``
                )
            } else {
              // no class found, print the list
              response
                .setTitle(`${response.title} - Races`)
                .addField(
                  'A list of 5e D&D Races',
                      `\`\`\`${PROPS.raceKeys.sort().join(', ')}\`\`\``
                )
            }
            break
          case ('spell'):
          case ('spells'):
            PROPS.spellTarget = ARGS[2] ? ARGS[2] : false
            PROPS.spellKeys = Object.keys(RPG.spells)
            if (PROPS.spellKeys.includes(PROPS.spellTarget)) {
              // spell is found
              PROPS.spell = RPG.spells[PROPS.spellTarget]
              response
                .setTitle(`${response.title} - ${PROPS.spellTarget.charAt(0).toUpperCase() + PROPS.spellTarget.slice(1)}`)
                .setURL(PROPS.spell.url)
                .setDescription(`Information for the [${PROPS.spellTarget}](${PROPS.spell.url} 'Link to more information about ${PROPS.spellTarget}') spell`)
                .addField(
                  'Description',
                  PROPS.spell.description
                )
                .addField(
                  'Level',
                  `\`\`\`${(PROPS.spell.level) ? PROPS.spell.level : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Casting Time',
                  `\`\`\`${(PROPS.spell.castingTime) ? PROPS.spell.castingTime : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Range',
                  `\`\`\`${(PROPS.spell.range) ? PROPS.spell.range : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Components',
                  `\`\`\`${(PROPS.spell.components.length) ? PROPS.spell.components.join(', ') : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Duration',
                  `\`\`\`${(PROPS.spell.duration) ? PROPS.spell.duration : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'School',
                  `\`\`\`${(PROPS.spell.school.length) ? PROPS.spell.school.join(', ') : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Attack / Save',
                  `\`\`\`${(PROPS.spell.attack.length) ? PROPS.spell.attack.join(', ') : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Damage / Effect',
                  `\`\`\`${(PROPS.spell.effect.length) ? PROPS.spell.effect.join(', ') : 'None'}\`\`\``,
                  true
                )
                .addField(
                  'Compatible Classes',
                  `\`\`\`${(PROPS.spell.classes.length) ? PROPS.spell.classes.join(', ') : 'None'}\`\`\``,
                  true
                )
            } else {
              // no class found, print the list
              response
                .setTitle(`${response.title} - Spells`)
                .addField(
                  'A list of 5e D&D spells',
                  `\`\`\`${PROPS.spellKeys.sort().join(', ')}\`\`\``
                )
            }
            break
          // generate a npc
          case ('npc'):
            // generate npc
            if (ARGS[2]) {
              // generate npc
              const props = {}

              const level = parseInt(ARGS[2])
              if (level) {
                props.level = level
              }

              const npc = RPG.generateNPC(props)
              response
                .setTitle(`${response.title} - NPC`)
                .setDescription(`**${npc.name}**`)
                .addField(
                  'Level',
                  npc.level,
                  true
                )
                .addField(
                  'Hit Points',
                  npc.hp,
                  true
                )
                .addField(
                  'Armor Class',
                  0,
                  true
                )
                .addField(
                  'Class',
                  npc.class,
                  true
                )
                .addField(
                  'Race',
                  npc.race,
                  true
                )
                .addField(
                  'Background',
                  npc.background
                )
                // stats
                .addField(
                  '<:strength:749086075539947581> Str',
                  `${npc.abilityScore.str} | (${rpg.calculateAbilityScoreModifier(npc.abilityScore.str)})`,
                  true
                )
                .addField(
                  '<:dexterity:749086075536015360> Dex',
                  `${npc.abilityScore.dex} | (${rpg.calculateAbilityScoreModifier(npc.abilityScore.dex)})`,
                  true
                )
                .addField(
                  '<:constitution:749086075523170364> Con',
                  `${npc.abilityScore.con} | (${rpg.calculateAbilityScoreModifier(npc.abilityScore.con)})`,
                  true
                )
                .addField(
                  '<:intelligence:749086075640873120> Int',
                  `${npc.abilityScore.int} | (${rpg.calculateAbilityScoreModifier(npc.abilityScore.int)})`,
                  true
                )
                .addField(
                  '<:wisdom:749086075342946366> Wis',
                  `${npc.abilityScore.wis} | (${rpg.calculateAbilityScoreModifier(npc.abilityScore.wis)})`,
                  true
                )
                .addField(
                  '<:charisma:749086075334688830> Cha',
                  `${npc.abilityScore.cha} | (${rpg.calculateAbilityScoreModifier(npc.abilityScore.cha)})`,
                  true
                )
                // extra stats
                .addField(
                  'Proficiencies',
                  npc.raceObject.proficiencies.join(', ')
                )
                .addField(
                  'Gender',
                  npc.gender,
                  true
                )
                .addField(
                  'Size',
                  npc.raceObject.size,
                  true
                )
                .addField(
                  'Speed',
                  npc.raceObject.speed,
                  true
                )
                .addField(
                  'Alignment',
                  npc.alignment,
                  true
                )
                .addField(
                  'Languages',
                  npc.raceObject.languages.join(', '),
                  true
                )
              if (Object.keys(npc.weapons).length > 0) {
                // add weapons
                let text = ''
                // attacks list
                for (const key in npc.weapons) {
                  const weapon = npc.weapons[key]
                  text += `**${key.charAt(0).toUpperCase() + key.slice(1)}**\n`
                  text += `${weapon.damage} |\` ${weapon.properties} \`\n`
                }
                response.addField(
                  'Attacks',
                  text
                )
              }
            } else {
              // show help
              response
                .setTitle(`${response.title} - NPC`)
                .setDescription('Generate a NPC for D&D 5e')
                .addField(
                  '/d&d npc random',
                  'Use `/d&d npc random` to generate a completely random npc.'
                )
                .addField(
                  '/d&d npc {level} {race} {class} {name}',
                  'Use `/d&d npc {level} {race} {class} {name}` to guide character generation. Use `/d&d npc race` or `/d&d npc class` to learn more about available options.'
                )
            }
            break
          // help
          default:
            response
              .setTitle(`${response.title} - Instructions`)
              .setDescription('A list of possible commands')
              .addField(
                '/d&d class',
                'Get a list of all classes. Use `/d&d class [className]` to get information about a specific class. You can also trigger this command with `/d&d classes`'
              )
              .addField(
                '/d&d proficiency',
                'Get a list of all proficiencies. Use `/d&d proficiency [proficiencyName]` to get information about a specific proficiency. You can also trigger this command with `/d&d proficiencies`, `/d&d prof`, and `/d&d profs`'
              )
              .addField(
                '/d&d race',
                'Get a list of all races. Use `/d&d race [raceName]` to get information about a specific race. You can also trigger this command with `/d&d races`'
              )
              .addField(
                '/d&d spell',
                'Get a list of all classes. Use `/d&d spell [spellName]` to get information about a specific spell. You can also trigger this command with `/d&d spells`'
              )
              .addField(
                'Other Triggers',
                'You can trigger D&D commands with `/d&d`, `/dnd`, and `/dd`'
              )
            break
        }

        TARGET.send(response)
        break
      case ('ping'):
        // say pong when they say ping
        response = 'Pong!'
        msg.reply(response)
        break
      case ('roll'):
        // roll a die
        PROPS.string = ARGS[1] ? ARGS[1] : '1d20'

        response = generateEmbed(':game_die: Roll Dice')
        // PROPS.args = ARGS[1] ? ARGS[1] : '1d20'

        // make sure the arg is valid
        if (PROPS.string.match(/^[d\d+-]*$/)) {
          // expression is valid
          // split each section
          PROPS.args = PROPS.string.split(/(?=\+)|(?=-)/g)

          PROPS.total = 0

          PROPS.title = ''
          PROPS.message = '```'

          for (let i = 0; i < PROPS.args.length; i++) {
            // calculate and add / subtract each roll
            let arg = PROPS.args[i]
            let operator = '+'
            let total
            let rolls
            let text

            // set add to false if subtract from total
            if (arg.includes('-')) {
              // subtract
              operator = '-'
            }
            // remove operator from beginning of string
            if (arg.charAt(0) === '+' || arg.charAt(0) === '-') {
              arg = arg.substr(1)
            }
            // if has a d, setup and roll to get quantity
            if (arg.includes('d')) {
              // roll for quantity
              const SPLIT = arg.split('d')
              const quantity = SPLIT[0]
              const sides = SPLIT[1]
              rolls = RPG.rollDice(quantity, sides)
              total = 0
              text = rolls.join(', ')
              for (let x = 0; x < rolls.length; x++) {
                total += rolls[x]
              }
            } else {
              total = parseInt(arg)
              text = parseInt(arg)
            }

            // add or subtract the quantity from the total
            if (operator === '+') {
              PROPS.total = PROPS.total + total
            } else {
              PROPS.total = PROPS.total - total
            }
            const prefix = (i === 0) ? '' : `${operator} `

            PROPS.message += `${prefix}[${arg} : ${text}] `
          }
          PROPS.message += '```'
          response
            .setDescription(`${PROPS.name} rolled __**${PROPS.total}**__`)
            .addField(
              PROPS.string,
              PROPS.message
            )
        } else {
          // expression is invalid
          response
            .setTitle(`${response.title} - Instructions`)
            .addField(
              'Please use the following format',
              '```{# of dice}d{# of sides}```' +
            'You can chain multiple dice rolls with "+" or "-". You can also add/subtract numbers to your roll "+1" or "-30"'
            )
            // .addBlankField()
        }

        TARGET.send(response)

        // if (ARGS[1]) {
        //   PROPS.args = ARGS[1].split(/d|\+|-/)
        // }

        // PROPS.quantity = PROPS.args[0] ? PROPS.args[0] : 1
        // PROPS.sides = PROPS.args[1] ? PROPS.args[1] : 20

        // if (PROPS.args.length > 2) {
        //   // do maths
        //   console.log(ARGS[1])
        // }

        // PROPS.result = rollDice(PROPS.quantity, PROPS.sides)
        // response = new DISCORD.MessageEmbed()
        //   .setTitle('Roll Dice')
        //   .setColor('#43b581')
        //   .setDescription(`${PROPS.name} rolled ${PROPS.quantity} ${PROPS.sides}-sided dice`)
        //   .addField('Name!', 'Value!')
        // console.log(PROPS.result)
        // TARGET.send(response)
        break
      default:
        // help
        response = generateEmbed(':helmet_with_cross: Help')
          .setDescription('A list of possible commands')
          .addField(
            '/apod',
            'View NASA\'s Astronomy Picture of the Day. You can use `/apod` to view today\'s image, or `/apod [yyyy/mm/dd]` to view a photo from a past date.'
          )
          .addField(
            '/coin',
            'Flip a coin to get either Heads or Tails'
          )
          .addField(
            '/d&d',
            'Get a list of all commands related to Dungeons & Dragons 5e. You can also trigger this command with `/dnd` or `/dd`'
          )
          .addField(
            '/help',
            'Receive this message again!'
          )
          .addField(
            '/invite',
            'Receive a link to invite this bot to your own server.'
          )
          .addField(
            '/ping',
            'Pong!'
          )
          .addField(
            '/roll {1d20}',
            'Roll a die, or multiple dice. Use `/roll help` for more detailed instructions.'
          )
        TARGET.send(response)
        break
    }
    msg.delete().catch(() => { /* do nothing because permissions issue */ })
    msg.channel.stopTyping()
  }
})

// network and websocket errors
CLIENT.on('sharedError', err => {
  console.error('A websocket connection encountered an error:', err)
})
