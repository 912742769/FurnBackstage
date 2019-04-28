import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderdata:[],
    datas:[]
  },
  getters:{
    getArticle:(state) => (id) =>{
      return state.orderdata.find(todo => todo.id == id)
    }
  },
  mutations: {
    getNewOrder(state,lists){
      state.orderdata=[]
      state.orderdata=lists
    },
  },
  actions: {

  }
})
