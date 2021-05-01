'use strict'
const App = require('./src/App')
const Watcher = require('./src/Watcher')
const params = require('./utils/params')

const { PORT = 3000 } = process.env

const server = new App(PORT, [
    new Watcher(params)
])

server.listen()
