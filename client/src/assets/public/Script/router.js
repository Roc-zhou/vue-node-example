import Vue from 'vue'
import Router from 'vue-router'
import component from '../../../components'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: component,
})
export default router
