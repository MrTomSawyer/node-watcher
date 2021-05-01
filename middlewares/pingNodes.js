'use strict'
const { req_body, node_routes } = require('../utils/params')
const axios = require('axios')

const pingNodes = async (req, res, next) => {

    let response
    let nodes_data = []

    for(let route of node_routes) {
        try{
            response = await axios.post(`http://${route}/public/`, req_body)

            nodes_data.push({ host: route, status: 'online', response: response.data })

        }catch (error) {
            console.log(`Node ${route} is currently offline. Time: ${new Date()}`)

            nodes_data.push({ host: route, status: 'offline', response: null })
        }
    }

    req.body.nodes_data = nodes_data

    return next()
}

module.exports = pingNodes
