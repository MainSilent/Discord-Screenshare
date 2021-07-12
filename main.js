require('dotenv').config()
const { Stream } = require('./stream')

const token = process.env.token
const stream = new Stream(token)

stream.guild_id = "859818307870523452"
stream.channel_id = "859818307870523456"
stream.load('https://www.youtube.com/watch?v=tNDYFYVvRGA', true)
