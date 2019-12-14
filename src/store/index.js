import Vue from 'vue'
import Vuex from 'vuex'
import login from './module/login'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        name:'222'
    },
    mutations: {
    },
    actions: {

    },
    modules: {
        login,
    }
})
