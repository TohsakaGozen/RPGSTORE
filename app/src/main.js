import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Nav from "./components/Nav";
import RightSqure from "./components/RightSqure";
import { Carousel, CarouselItem, Backtop, Icon, Pagination, Message } from 'element-ui'
import store from './store'
import VueLazeLoad from 'vue-lazyload'
import load from '@/assets/loading.png'
Vue.use(VueLazeLoad, {
  loading: load
})
//引入mockServe.js
import '@/mock/mockServe'
Vue.config.productionTip = false
Vue.component(Nav.name, Nav);
Vue.component(RightSqure.name, RightSqure);
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Pagination)
Vue.prototype.$message = Message
new Vue({
  render: h => h(App),
  //注册全局事件总线（$bus）
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  //注册路由
  router,
  //注册仓库，组件实例的身上会多出一个属性$store属性
  store
}).$mount('#app')
