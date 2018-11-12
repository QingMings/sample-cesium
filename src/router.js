import Vue from 'vue'
import Router from 'vue-router'
import SampleCesium from "@/views/sample-cesium"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sample-cesium',
      component: SampleCesium
    }
  ]
})
