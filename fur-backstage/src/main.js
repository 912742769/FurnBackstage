import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// ajax 请求库
import axios from 'axios'
Vue.prototype.$http=axios
//统一设置请求前缀
axios.defaults.baseURL='http://172.16.7.82:8080' 

/* //请求拦截
axios.interceptors.request.use(config =>{
  //每次发请求之前都需要判断token
  //如果存在，则在请求头上带上 token，一起发送给后台验证
  const token = localStorage.getItem('token')
  token && (config.headers["Authorization"] = "Bearer "+token)
  return config
},error =>{
return Promise.reject(error)
})
//响应拦截
axios.interceptors.response.use(response =>{
if(response.data.token){
  localStorage.getItem('token',response.data.token)
}
return response
},error =>{
let res = error.response
switch(res.status){
  case 401://taken 验证失败，需要重新登陆
    localStorage.removeItem('token')
    return router.replace({
      path:'/login'
    }) 
  case 404:
    console.log('404错误')
    break
}
return Promise.reject(error)
}) */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
