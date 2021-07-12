require('dotenv').config()
const { Stream } = require('./stream')
const Discord = require('discord.js-self')

const client = new Discord.Client()
const token = process.env.token
const stream = new Stream(token)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
})
 
client.login(token)

// stream.guild_id = "859818307870523452"
// stream.channel_id = "859818307870523456"
// stream.load('https://www.youtube.com/watch?v=tNDYFYVvRGA', true)
