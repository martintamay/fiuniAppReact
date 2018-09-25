import axios from 'axios';

function getToken(){
  if (sessionStorage.getItem("session_token")===null &&
    localStorage.getItem("session_token")===null) {
    return null;
  }
  return sessionStorage.getItem("session_token")===null ?
                localStorage.getItem("session_token") :
                sessionStorage.getItem("session_token");
}

function formatParams(params){
  if(params==null){
    return { session_token: getToken() };
  } else {
    params['session_token'] = getToken();
    return params;
  }
}

function get(url, params=null){
  return axios.get(url, { params: formatParams(params) });
}


function put(url, params=null){
  return axios.put(url, formatParams(params));
}


function post(url, params=null){
  return axios.post(url, formatParams(params));
}


function del(url, params=null){
  return axios.delete(url, { params: formatParams(params) });
}

export default { get, put, post, del };
