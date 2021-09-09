import makeField, {InputField} from './makeField'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

const checkAlias = (key: string, alias: any): any => {
    let hasAliasKey = false
    const _ = alias instanceof Array ? alias : [alias]
    for (let i = 0; i < _.length; i++) {
        const item = _[i]
        if (item == key || item?.prop == key) {
            hasAliasKey = item
            break
        }
    }
    return hasAliasKey
}
/**
 * fields {key:value}value不为field时，通过key查找field，未找到使用全局_globalFields,内的正则反向匹配
 */
export default (fields = {}, globalFields = {}) => {
    const _fields: { [key: string]: any } = cloneDeep(fields)
    const _globalFields: any = cloneDeep(globalFields)

    const findByKey = (key: string, field: Field | any) => {
        let item = cloneDeep(_globalFields[key])
        // 未找到当全局key时，从别名中查找
        if (!item) {
            const keys = Object.keys(_globalFields)
            for (let i = 0; i < keys.length; i++) {
                const f = _globalFields[keys[i]]
                const alias: boolean | { prop: ''; label: '' } = checkAlias(key, f?.field?.alias)
                if (alias) {
                    item = f
                    if (typeof alias != 'boolean' && alias?.prop) item.field.label = alias?.label
                    break
                }
            }
        }
        if (item) {
            // TODO 逻辑优化
            // if (field && (field instanceof Array) || !(field instanceof Object)) item.field.value = field
            if (field instanceof Object) item.field = merge({}, item.field, field)
        }
        return item
    }

    const findbyVal = (val: any) => {
        const keys = Object.keys(_globalFields)
        let item = null
        for (let i = 0; i < keys.length; i++) {
            const field = _globalFields[keys[i]]
            if (field && field.field) {
                const fieldPatternHit = field.field.pattern instanceof RegExp && field.field.pattern.test(val)
                const fieldKeyHit = val === keys[i]
                if (fieldKeyHit || fieldPatternHit) {
                    item = cloneDeep(field)
                    item.field.label = ''
                    break
                }
            }
        }
        return item
    }

    const defaultField = (key: string) => {
        console.warn(`lazyform: ${key} not find. use default input`)
        return makeField('input', key)
    }

    const keys = Object.keys(_fields)
    return keys.map((key: string) => {
        let field = _fields[key]
        if (!(field instanceof InputField)) {
            field = findByKey(key, field) || findbyVal(field) || defaultField(key)
        }
        field.field.key = key
        if (!field.field.label && field.field.label !== false) field.field.label = key
        return field
    })
}
