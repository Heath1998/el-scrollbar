import VueScrollbar from './main';
import './style.css'
VueScrollbar.install = function (Vue) {
  Vue.component(VueScrollbar.name,VueScrollbar)
}
export default VueScrollbar

