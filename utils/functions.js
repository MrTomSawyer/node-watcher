const functions = {

    // Возвращает объект со статусом true если все ноды онлайн и false если хотя бы одна лежит + массив лежащих IP
    isOnline(data) {
        const status_codes = data.map(node => node.status)

        const all_status = status_codes.some(status => status === 'offline')

        if(!all_status) return { nodes_online: true }
        
        const offline = data.map(node => {
            if(node.status === 'offline') {
                return node.host
            }
        })

        return { nodes_online: false, offline }
    },

    // Возвращает объект со статусом true если хэши всех нод совпали. Если нет, вернет объект с false и объект вида { хэш : массив нод } с таким хэшем
    compareHash(data) {
        const hash_list = data.map(node => node.response.result[0].hash)
    
        const is_same_hash = new Set(hash_list).size === 1;
    
        if(is_same_hash) return { isSameHash: true }
    
        let hash_stat = {}
    
        data.forEach(node => {
            if(!hash_stat[node.response.result[0].hash]) {
                hash_stat[node.response.result[0].hash] = []
            }
    
            hash_stat[node.response.result[0].hash].push(node.host)
        })
    
        return { isSameHash: false, hash_stat }
    },

    compareHeight(data) {
        const height_list = data.map(node => node.response.result[0].height)
    
        const is_same_height = new Set(height_list).size === 1;
    
        if(is_same_height) return { isSameHeight: true }
    
        let height_stat = {}
    
        data.forEach(node => {
            if(!height_stat[node.response.result[0].height]) {
                height_stat[node.response.result[0].height] = []
            }
    
            height_stat[node.response.result[0].height].push(node.host)
        })
    
        return { isSameHeight: false, height_stat }
    },

    makeReport({ status, hash, height }) {
        return {
            resent_update: `${new Date().toDateString()} ${new Date().toTimeString()}`,
            status: status.nodes_online ? 'All nodes are online' : `Some of nodes are currently offline`,
            nodes_offline: !status.nodes_online ? status.offline : null,
            is_same_hash: hash.isSameHash ? 'All nodes have the same hash' : 'Some nodes have different hashes',
            different_hashes: !hash.isSameHash ? hash.hash_stat : null,
            is_same_height: height.isSameHeight ? 'All nodes have the same height' : 'Some nodes have different heights',
            different_heights: !height.isSameHeight ? height.height_stat : null
        }
    }
}

module.exports = functions
