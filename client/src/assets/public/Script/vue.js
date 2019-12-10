import Vue from 'vue'
import $util from 'rz-methods'
import { $api, $http } from './axios'
// import Vw from 'em-vw'

// console.log($util.formatDate);
// Vw(10) // 初始化VM(CSS3)

Vue.config.productionTip = false

Object.assign(Vue.prototype, {
  $util,
  $api,
  $http,
  $goto(obj, attr, boolean = true) { // 应用内/外跳转
    const {
      $router,
    } = this
    if (obj) boolean ? $router[attr || 'push'](obj) : window[attr || 'open'](
      obj)
    return $router
  },
})

export default Vue
