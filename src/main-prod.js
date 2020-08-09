import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

//导入nprogress js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"


//添加axios请求拦截器，添加token
axios.interceptors.request.use(config=>{
  // 在request拦截器，显示进度条
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

// 在response拦截器，隐藏进度条
axios.interceptors.response.use(config=>{
  NProgress.done();
  return config;
})

// 挂载原型属性
Vue.prototype.$http= axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter("dateFormat",function(originVal){
  const dt =new Date(originVal);

  const y =dt.getFullYear();
  const m =(dt.getMonth()+1+'').padStart(2,'0');
  const d = (dt.getDate()+'').padStart(2,'0');

  const hh = (dt.getHours()+'').padStart(2,'0');
  const mm = (dt.getMinutes()+'').padStart(2,'0');
  const ss = (dt.getSeconds()+'').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}-${mm}-${ss}`;
})

//将文本编辑器注册成全局可用组件
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
