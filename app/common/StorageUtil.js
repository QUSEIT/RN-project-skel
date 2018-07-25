import {AsyncStorage} from 'react-native'

/**
 * 数据存储工具
 * */

function clear() {
    return AsyncStorage.clear()
}

function get(key, defaultValue = null) {
    function parseJson (item) {
        try { return JSON.parse(item) }
        catch (e) { return defaultValue }
    }
    return AsyncStorage.getItem(key).then(
        value => parseJson(value)
    )
}

function set(key, value) {
    valueStr = JSON.stringify(value);
    if (valueStr){
        return AsyncStorage.setItem(key, valueStr)
    }
    else console.log('not set, stringify failed:', key, value)
}

function remove(key) {
    return AsyncStorage.removeItem(key)
}

function multiGet(...keys) {
    return AsyncStorage.multiGet([...keys]).then(stores => {
        const data = {};
        stores.forEach((result, i, store) => {
            data[store[i][0]] = JSON.parse(store[i][1])
        });
        return data
    })
}

function multiRemove(...keys) {
    return AsyncStorage.multiRemove([...keys])
}

export default {
    clear,
    get,
    set,
    remove,
    multiGet,
    multiRemove,
}
