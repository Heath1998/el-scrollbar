import Vue from 'vue'
import App from './App'
import vElementScrollbar from '../dist/vElementScrollbar';
// import vElementScrollbar from './plugin/index';
Vue.config.productionTip = false

Vue.use(vElementScrollbar)
new Vue({
  el: '#app',
  render: h => h(App)
})
