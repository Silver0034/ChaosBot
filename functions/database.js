const { MySQL } = require('../secret.json')

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

        const query = `CREATE TABLE IF NOT EXISTS guilds(
          id VARCHAR(25) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          apod_channel_id VARCHAR(25),
          apod_date VARCHAR(10),
          holiday_channel_id VARCHAR(25),
          holiday_date VARCHAR(10)
        );`

        CONNECTION.query(query, (err) => {
          if (err) {
            console.log('error in creating table', err)
            return
          }

          console.log('Connected to database table')
        })

        // * replace columns if they don't exist
        CONNECTION.query('ALTER TABLE guilds ADD COLUMN IF NOT EXISTS apod_channel_id VARCHAR(25);', (err) => {
          if (err) {
            console.log('error updating column: ', err)
          }
        })
        CONNECTION.query('ALTER TABLE guilds ADD COLUMN IF NOT EXISTS apod_date VARCHAR(10);', (err) => {
          if (err) {
            console.log('error updating column: ', err)
          }
        })
        CONNECTION.query('ALTER TABLE guilds ADD COLUMN IF NOT EXISTS holiday_channel_id VARCHAR(25);', (err) => {
          if (err) {
            console.log('error updating column: ', err)
          }
        })
        CONNECTION.query('ALTER TABLE guilds ADD COLUMN IF NOT EXISTS holiday_date VARCHAR(10);', (err) => {
          if (err) {
            console.log('error updating column: ', err)
          }
        })

        // query += 'ALTER TABLE guilds ADD COLUMN IF NOT EXISTS apod_channel_id VARCHAR(25);'

        // query += 'ALTER TABLE guilds ADD COLUMN IF NOT EXISTS apod_date VARCHAR(10);'
        // query += 'ALTER TABLE guilds ADD COLUMN IF NOT EXISTS holiday_channel_id VARCHAR(25);'
        // query += 'ALTER TABLE guilds ADD COLUMN IF NOT EXISTS holiday_date VARCHAR(10);'

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

exports.execute = function (client) {
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
