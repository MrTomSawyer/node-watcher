'use strict'
const { req_body, node_routes } = require('../utils/params')
const axios = require('axios')

const checkNodes = async () => {
    let main_node
    let nodes

    try {
        main_node = await axios.get('http://localhost:3000/watch/main')
        nodes = await axios.get('http://localhost:3000/watch')
    } catch (error) {
        console.log('Failed to check nodes')
        console.log(error.message)
    }

    if(main_node?.data.status === 'offline') {
        console.log('========')
        console.log(`URGENT! THE MAIN NODE HAS GONE OFFLINE! IT HAPPENED ON: ${new Date().toDateString()} ${new Date().toTimeString()}`)
        console.log('========')
    } else {
        console.log(' ')
        console.log('Main node is online and working')
        console.log(' ')
    }

    console.log('Nodes status: ', nodes?.data)
}

const ping = () => {
    setTimeout(function update(){
        checkNodes()
        console.log('===================')
        let interval = setTimeout(update, 1000 * 60 * 20)
    })
}

ping()
