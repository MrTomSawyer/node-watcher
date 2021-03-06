const functions = {

    // Возвращает объект со статусом true если все ноды онлайн и false если хотя бы одна лежит + массив лежащих IP
    isOnline(data) {
        const offline = data.filter(node => node.status === 'offline')

        if(offline.length === 0) return { nodes_online: true }

        return { nodes_online: false, offline }
    },

    // Возвращает объект со статусом true если хэши всех нод совпали. Если нет, вернет объект с false и объект вида { хэш : массив нод } с таким хэшем
    compareHash(data) {
        const data_list = data.map(node => node.response?.result[0].hash)
        const hash_list = data_list.filter(hash => hash !== undefined)
    
        const is_same_hash = new Set(hash_list).size === 1;
        
        if(is_same_hash) return { is_same_hash: true, hash_value: hash_list[0]}
    
        let hash_stat = {}
    
        data.forEach(node => {
            if(node.response?.result[0]?.hash === undefined) return

            if(!hash_stat[node.response?.result[0].hash]) {
                hash_stat[node.response?.result[0].hash] = []
            }
    
            hash_stat[node.response?.result[0].hash].push(node.host)
        })
    
        return { is_same_hash: false, hash_stat }
    },

    compareHeight(data) {
        const data_list = data.map(node => node.response?.result[0].height)
        const height_list = data_list.filter(height => height !== undefined)

        const is_same_height = new Set(height_list).size === 1;
    
        if(is_same_height) return { is_same_height: true, height_value: height_list[0] }
    
        let height_stat = {}
    
        data.forEach(node => {
            if(!height_stat[node.response?.result[0].height]) {
                height_stat[node.response?.result[0].height] = []
            }
    
            height_stat[node.response?.result[0].height].push(node.host)
        })
    
        return { is_same_height: false, height_stat }
    },

    makeReport({ status, hash, height }) {
        return {
            resent_update: `${new Date().toDateString()} ${new Date().toTimeString()}`,
            status: status.nodes_online ? 'All nodes are online' : `Some of nodes are currently offline`,
            nodes_offline: !status.nodes_online ? status.offline : null,
            is_same_hash: hash.is_same_hash ? true : false,
            hash_value: hash.is_same_hash ? hash.hash_value : 'Hash is different among modes',
            different_hashes: !hash.is_same_hash ? hash.hash_stat : null,
            is_same_height: height.is_same_height ? true : false,
            height_value: height.is_same_height ? height.height_value : 'Nodes have different heights nows',
            different_heights: !height.is_same_height ? height.height_stat : null
        }
    }
}

module.exports = functions
