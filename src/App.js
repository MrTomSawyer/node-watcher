'use strict'
const express = require('express')

class App {
    app = express()
    
    constructor(PORT, controllers) {
        this.port = PORT
        this.initMiddlewares()
        this.initControllers(controllers)
    }

    initControllers = (controllers) => {
        controllers.forEach(controller => this.app.use('/', controller.router))
    }

    initMiddlewares = () => {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log(`The Watcher is online and is running on port ${this.port}`)
        })
    }
}

module.exports = App
