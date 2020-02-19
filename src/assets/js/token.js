import Cookies from 'js-cookie';

const admin = 'admin';
const username = 'username'

export function getToken(){
  return Cookies.get(admin)
}

export function setToken(token) {
  Cookies.set(admin,token)
}

export function getUsername(){
  return Cookies.get(username)
}

export function setUsername(name) {
  Cookies.set(username,name)
}