import Vue from '../src/assets/public/Script/vue'
import App from './App.vue'
import router from '../src/assets/public/Script/router'
import './assets/public/Style/main.css' // 项目UI
import 'babel-polyfill'
import 'rz-ui'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
