import cloneDeep from 'lodash/cloneDeep'

const fidlds = {}

export default new Proxy(fidlds, {
    get: function (target: any, key) {
        return target[key]
    },
    set: function (target: any, key, value) {
        target[key] = cloneDeep(value)
        return true
    },
})
