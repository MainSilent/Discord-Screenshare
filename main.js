require('dotenv').config()
const { Stream } = require('./stream')

const token = process.env.token
const stream = new Stream(token)

