import axios from 'axios';

function getSessionToken(){
  return sessionStorage.getItem("session_token")===null ?
  localStorage.getItem("session_token") :
  sessionStorage.getItem("session_token");
}

export default {

  get: function(url){
    if(url.includes('?')){
      return axios.get(`${url}&session_token=${getSessionToken()}`);
    }
    return axios.get(`${url}?session_token=${getSessionToken()}`);
  },

  put: function(url, params=null){
    if (params===null){
      params = { session_token: getSessionToken() };
    }else{
      params['session_token'] = getSessionToken();
    }
    return axios.put(url, params);
  },

  post: function(url, params=null){
    if (params===null){
      params = { session_token: getSessionToken() };
    }else{
      params['session_token'] = getSessionToken();
    }
    return axios.post(url, params);
  },

  delete: function(url, params=null){
    if (params===null){
      params = { session_token: getSessionToken() };
    }else{
      params['session_token'] = getSessionToken();
    }
    return axios.delete(url, params);
  }
}
