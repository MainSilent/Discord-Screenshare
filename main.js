require('dotenv').config()
const { Stream } = require('./stream')
const Discord = require('discord.js')

const reject = '❌'
const accept = '✅'
const prefix = '*'
const client = new Discord.Client()
const token = process.env.token
let stream = new Stream(token)

const notAllowed = msg => {
    return stream.owner !== msg.author.id && !msg.member.hasPermission('ADMINISTRATOR')
}

client.on('ready', () => console.log("Bot started"))

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        content = msg.content.split(" ")
        command = content[0].split('*')[1]
        
        switch (command) {
            case 'p':
                if (stream.in_progress && notAllowed(msg)) {
                    msg.reply("Another session is already in progress")
                    return
                }

                const voice_channel = msg.member.voiceChannel
                if (!voice_channel) {
                    msg.reply("You need to be in a voice channel to use this command")
                    return
                }

                stream.in_progress = true
                stream.owner = msg.author.id
                stream.guild_id = msg.guild.id
                stream.channel_id = voice_channel.id
                url = content[1]
                // not safe...
                if (url.includes('youtube.com') || url.includes('xnxx.com'))
                    stream.load(url, true)
                else
                    stream.load(url)
                break;
            case 'play':
                notAllowed(msg) ?
                    msg.react(reject) :
                    stream.play()
                break;
            case 'pause':
                stream.pause()
                break;
            case 'duration':
                if (stream.duration)
                    msg.channel.send(stream.hms(stream.duration))
                else
                    msg.reply("N/A, try again later")
                break;
            case 'current':
                if (content[1])
                    stream.current(content[1])
                else
                    stream.current().then(result => {
                        if (result)
                            msg.channel.send(stream.hms(result))
                        else
                            msg.reply("N/A, try again later")     
                    })
                break;
            case 'stop':
                stream.stop()
                stream.in_progress = false
                break;
        }
    }
})

client.login(token)