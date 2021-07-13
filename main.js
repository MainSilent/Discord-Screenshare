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
        command = content[0].split(prefix)[1]
        
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
                
                if(!url) {
                    msg.reply("Unknown command, type `*help` for list of commands")
                    return
                }
                    
                // Validate url scheme
                const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                const regex = new RegExp(expression)
                if (!url.match(regex)) {
                    msg.react(reject)
                    return
                }

                !stream.in_loading ? 
                    msg.channel.send("Please wait...")
                        .then(msg => {
                            // not safe...
                            if (url.includes('youtube.com') || url.includes('xnxx.com') || url.includes('xvideos.com') || url.includes('xhamster.com') || url.includes('instagram.com'))
                                stream.load(url, true, msg)
                            else
                                stream.load(url, false, msg)
                        }) :
                    msg.reply("Another video loading is already in progress, Try again later.")
                break;
            case 'play':
                notAllowed(msg) ?
                    msg.react(reject) :
                    stream.play()
                break;
            case 'pause':
                notAllowed(msg) ?
                    msg.react(reject) :
                    stream.pause()
                break;
            case 'duration':
                stream.duration ?
                    msg.channel.send(stream.hms(stream.duration)) :
                    msg.reply("N/A, try again later")
                break;
            case 'seek':
                if (content[1])
                    notAllowed(msg) ?
                        msg.react(reject) :
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
                if (notAllowed(msg) || stream.in_loading) 
                    msg.react(reject)
                else {
                    stream.stop()
                    stream.in_progress = false
                }
                break;
            case 'help':
                msg.channel.send({
                    embed: {
                        color: 0x03b2f8,
                        title: 'Commands',
                        description: `
                            *p \`url\` | Youtube, Instagram, xnxx, xvideos, xhamster | direct link (without downloading)\n
                            *play | Play video\n
                            *pause | Pause video\n
                            *duration | Show video duration\n
                            *seek | Show current video time\n
                            *seek \`sec, +sec, -sec\` | Change video time\n
                            *stop | Stop streaming
                        `
                    }
                })
                break;
            default:
                msg.reply("Unknown command, type `*help` for list of commands")
        }
    }
})

client.login(token)