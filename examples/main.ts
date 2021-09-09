import Vue from 'vue'
import App from './App.vue'
import lForm from '../src/index'
import fieldConfig from './fieldConfig'


Vue.config.productionTip = false
Vue.use(lForm, {fields: fieldConfig})
new Vue({
    render: h => h(App),
}).$mount('#app')
