import {getLogin} from "../../api/login/login";
import {setToken ,setUsername ,getUsername} from "../../assets/js/token";

const login = {
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
        }
    },
    actions:{
        ACTIONS_LOGIN(content,data){
            return new Promise((resolve,reject) =>{
                getLogin(data).then(response =>{
                    let data = response.data;
                    console.log(response);
                    content.commit('SET_TOKEN',data.token);
                    content.commit('SET_USERNAME',data.username);
                    setToken(data.token)
                    setUsername(data.username)
                    resolve(response)
                }).catch(error =>{
                    reject(error)
                })
            })
        }
    }
}

export default login;