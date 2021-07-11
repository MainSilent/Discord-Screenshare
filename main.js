require('dotenv').config()
const { Stream } = require('./stream')

const token = process.env.token
const stream = new Stream(token)

stream.guild_id = 578558255392096256
stream.load('./client/tmp/video')