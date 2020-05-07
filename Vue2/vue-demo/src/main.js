// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 1）安装elementUI
// npm i element-ui
// 2）引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 3）Vue使用elementUI
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //以下的，K:V都是简写规则：属性名与属性值相同可简写（ES6）
  router,//import router from './router'
  components: { App },
  template: '<App/>'
})
