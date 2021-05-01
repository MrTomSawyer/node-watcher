'use strict'
const App = require('./App')
const Watcher = require('./Watcher')
const params = require('./utils/params')

const { PORT = 3000 } = process.env

const server = new App(PORT, [
    new Watcher(params)
])

server.listen()
