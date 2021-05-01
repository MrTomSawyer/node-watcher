'use strict'
const express = require('express')
const axios = require('axios')
const pingNodes = require('./middlewares/pingNodes')
const { req_body } = require('./utils/params')

const { isOnline, compareHash, compareHeight, makeReport } = require('./utils/functions')

class Watcher {
    path = '/watch'
    router = express.Router()

    constructor({ node_routes, main_node }) {
        this.routes = node_routes
        this.main_node = main_node
        this.initRoutes()
    }

    initRoutes = () => {
        this.router.get(this.path, pingNodes, this.handleNodesData)
        this.router.get(`${this.path}/main`, this.pingMainNode)
    }

    pingMainNode = async (req, res, next) => {
        let response

        try {
            response = await axios.post(`http://${this.main_node}/public/`, req_body)

            res.status(200).json({ status: 'online', response: response.data })

        } catch (error) {
            console.log('========')
            console.log(`URGENT! THE MAIN NODE HAS GONE OFFLINE! IT HAPPENED ON ${new Date()}`)
            console.log('========')

            res.status(response.status).json({ status: 'offline', response: response.data })
            next(error)
        }
    }

    handleNodesData = (req, res, next) => {
        const { nodes_data } = req.body

        const stat = {
            status: isOnline(nodes_data),
            hash: compareHash(nodes_data),
            height: compareHeight(nodes_data)
        }
        
        const report = makeReport(stat)

        res.status(200).send(report)
    }
}

module.exports = Watcher
