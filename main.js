require('dotenv').config()
const { Stream } = require('./stream')
const Discord = require('discord.js')

const prefix = '*'
const client = new Discord.Client()
const token = process.env.token
let stream = new Stream(token)

client.on('ready', () => console.log("Bot started"))

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        command = msg.content.split(" ")[0].strip("*")
        console.log(command)
    }
})

client.login(token)

// stream.guild_id = "859818307870523452"
// stream.channel_id = "859818307870523456"
// stream.load('https://www.youtube.com/watch?v=tNDYFYVvRGA', true)