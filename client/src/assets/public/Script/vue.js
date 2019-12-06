import Vue from 'vue'
// import Vw from 'em-vw'

// Vw(10) // 初始化VM(CSS3)

Vue.config.productionTip = false

Object.assign(Vue.prototype, {
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
