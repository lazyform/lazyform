import lazyform from './lazyform.vue'
import GlobalFields from './lib/GlobalFields'
import makeField from './lib/makeField'
import Vue from 'vue'

let installed = false

const install = (vue: typeof Vue, options: VFormatterOptions) => {
    if (installed) return
    installed = true
    const {fields} = options || {}
    if (fields instanceof Object) {
        Object.keys(fields).forEach(key => {
            GlobalFields[key] = fields[key]
        })
        Object.freeze(GlobalFields)
    }
    vue.component('lForm', lazyform)
    const {submitBtnClass, resetBtnClass, buttonBtnClass} = options
    Vue.prototype.$vFormatterConfig = {submitBtnClass, resetBtnClass, buttonBtnClass}

}

export {install, makeField, lazyform}
export default install

