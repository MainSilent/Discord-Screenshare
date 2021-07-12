require('dotenv').config()
const { Stream } = require('./stream')
const Discord = require('discord.js')

const prefix = '*'
const client = new Discord.Client()
const token = process.env.token
let stream = new Stream(token, false)

client.on('ready', () => console.log("Bot started"))

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        content = msg.content.split(" ")
        command = content[0].split('*')[1]
        
        switch (command) {
            case 'p':
                stream.guild_id = msg.guild.id
                stream.channel_id = msg.member.voiceChannel.id
                stream.load(content[1])
                break;
            case 'play':
                stream.play()
                break;
            case 'pause':
                stream.pause()
                break;
            case 'stop':
                stream.stop()
                break;
        }
    }
})

client.login(token)

// stream.guild_id = "859818307870523452"
// stream.channel_id = "859818307870523456"
// stream.load('https://www.youtube.com/watch?v=tNDYFYVvRGA', true)