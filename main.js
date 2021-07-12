require('dotenv').config()
const { Stream } = require('./stream')
const Discord = require('discord.js')

const client = new Discord.Client()
const token = process.env.token
let stream = new Stream(token)

client.on('ready', () => console.log("Bot started"))
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
})
 
client.login(token)

// stream.guild_id = "859818307870523452"
// stream.channel_id = "859818307870523456"
// stream.load('https://www.youtube.com/watch?v=tNDYFYVvRGA', true)
