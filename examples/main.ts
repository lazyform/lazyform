import Vue from 'vue'
import App from './App.vue'
import lazyform from '../src/index'
import langZh from '../src/lang/zh-cn'
import fieldConfig from './fieldConfig'


Vue.config.productionTip = false
Vue.use(lazyform, Object.assign({}, langZh, {fields: fieldConfig},))
new Vue({
    render: h => h(App),
}).$mount('#app')
