console.log('try to connect to database!!')
const { MySQL } = require('../secret.json')
const Discord = require('discord.js')
const client = new Discord.Client()

const mysql = require('mysql')
const db = 'chaos_db'

const CONNECTION = mysql.createConnection({
  host: MySQL.Host,
  user: MySQL.User,
  password: MySQL.Password
})

CONNECTION.connect(function (error) {
  if (error) {
    console.log(error)
  } else {
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
  }
})

exports.connection = CONNECTION

exports.updateGuilds = function () {
  let query = 'INSERT INTO guilds (id, name) VALUES'
  const args = []
  client.guilds.cache.map(guild => {
    args.push(` ("${guild.id}", "${guild.name}")`)
    return true
  })
  // add variables to query
  query += args.join(', ')
  query += ' ON DUPLICATE KEY UPDATE name = VALUES(name)'

  CONNECTION.query(query, (err) => {
    if (err) {
      console.log('error showing table: ', err)
    }
  })
}

// Update db when joining servers or server/channel updates/deleted
client.on('guildCreate', () => {
  exports.updateGuilds()
})
client.on('guildUpdate', () => {
  exports.updateGuilds()
})
client.on('guildDelete', () => {
  exports.updateGuilds()
})
client.on('channelUpdate', () => {
  exports.updateGuilds()
})
client.on('channelDelete', () => {
  exports.updateGuilds()
})
