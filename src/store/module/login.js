import {getLogin} from "@/api/login/index";
import {setToken ,setUsername ,getUsername, removeToken, removeUsername} from "@/assets/js/token";

const login = {
  namespaced: true,
  state:{
    token:'',
    username: getUsername() || ''
  },
  getters:{

  },
  mutations:{
    SET_TOKEN(state,val){
      state.token = val;
    },
    SET_USERNAME(state,val){
      state.username = val;
    },
    REMOVAL_TOKEN(state){
      state.token = '';
      removeToken()
    },
    REMOVAL_USERNAME(state){
      state.username = '';
      removeUsername()
    }
  },
  actions:{
    ACTIONS_LOGIN(content, data){
      return new Promise((resolve, reject) =>{
        getLogin(data)
          .then(response => {
            console.log(response);
            let data = response.data;
            content.commit('SET_TOKEN',data.token);
            content.commit('SET_USERNAME',data.username);
            setToken(data.token);
            setUsername(data.username);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default login;