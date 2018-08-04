import axios from 'axios';

//const SERVER = "https://fiuni-app.herokuapp.com/api";
const SERVER = "http://localhost:3000/api";

export const ERRLOGIN = "ERRLOGIN";
export const LOGIN_REQ = "LOGIN_REQ";
export const RELOGIN_REQ = "RELOGIN_REQ";
export const GET_NOTAS = "GET_NOTAS";
export const GET_MATERIAS = "GET_MATERIAS";
export const GET_CARRERAS = "GET_CARRERAS";
export const GET_EXAMENES = "GET_EXAMENES";
export const GET_MATERIAS_CURSANDOSE = "GET_MATERIAS_CURSANDOSE";
export const GET_MATERIAS_A_CARGO = "GET_MATERIAS_A_CARGO";
export const GET_ALUMNOS_PARA_CARGA = "GET_ALUMNOS_PARA_CARGA";
export const ALUMNO_REQ = "ALUMNO_REQ";
export const NOTAS_MATERIAS = "NOTAS_MATERIAS";
export const NOTES_CHECK = "NOTES_CHECK";
export const CARGA_MATERIA = "CARGA_MATERIA";
export const PROFESORES_REQ = "PROFESORES_REQ";

export function agregarMateria(datos){
  let req = axios.post(`${SERVER}/susbjects`, datos);
  return {
    type: CARGA_MATERIA,
    payload: req
  };
}

export function enviarNotasRevisadas(notas){
  let req = axios.put(`${SERVER}/notes/bulk-check`, {
    notes: notas
  });
  return {
    type: NOTES_CHECK,
    payload: req
  }
}
export function notasMateria(idmateria){
  let req = axios.get(`${SERVER}/subjects/${idmateria}/notes`);
  return {
    type: NOTAS_MATERIAS, payload:req
  };
}

export function loguear(correo, contrasenha, mantener=false){
  setSessionStorage(mantener);
  let req = axios.put(`${SERVER}/people/log_in`, {
    person: {
      email: `${correo}@fiuni.edu.py`,
      password: contrasenha
    }
  });

  return {
    type: LOGIN_REQ,
    payload: req
  };
}

export function getAlumno(idalumno){
  let req = axios.get(`${SERVER}/students/${idalumno}`,{
    headers: {'Accept': 'application/json'}
  });
  return {
    type: ALUMNO_REQ,
    payload: req
  };
}


export function getCarreras(){
  let req = axios.get(`${SERVER}/career`);

  return {
    type: GET_CARRERAS,
    payload: req
  };
}

export function cerrarSesion(){
  sessionStorage.removeItem("session_token");
  localStorage.removeItem("session_token");
  return {
    type: ERRLOGIN,
    payload: {}
  };
}

export function reloguin(){
  if (sessionStorage.getItem("session_token")===null &&
    localStorage.getItem("session_token")===null) {
    return {
      type: ERRLOGIN,
      payload: {}
    };
  }
  let token = sessionStorage.getItem("session_token")===null ?
                localStorage.getItem("session_token") :
                sessionStorage.getItem("session_token");
  let req = axios.put(`${SERVER}/people/relogin`, {
    person: {
      session_token: token
    }
  });
  return {
    type: RELOGIN_REQ,
    payload: req
  };
}

export function getAlumnosParaCargar(idmateria){
  return {
    type: GET_ALUMNOS_PARA_CARGA,
    payload: [
      {
        id: 1,
        finished: null,
        finish_date: null,
        student: {
          id: 1,
          person: {
            id: 1,
            names: "Martín Tamay",
            ci: "4315943"
          }
        }
      },
      {
        id: 2,
        finished: null,
        finish_date: null,
        student: {
          id: 2,
          person: {
            id: 2,
            names: "Frijolito",
            ci: "5486975"
          }
        }
      }
    ]
  };
}

export function getMateriasACargo(idusuario){
  return {
    type: GET_MATERIAS_A_CARGO,
    payload: [
      {
        "id": 1,
        "name": "Física 1",
        "semester": 1
      },
      {
        "id": 2,
        "name": "Análisis 1",
        "semester": 1
      }
    ]
  };
}

export function getMateriasCursandose(idalumno){
  let req = axios.get(`${SERVER}/students/${idalumno}/subjects`);

  return {
    type: GET_MATERIAS_CURSANDOSE,
    payload: req
  };
}

export function getMaterias(idalumno=null){
  let req = null;
  if(idalumno){
    req = axios.get(`${SERVER}/student/${idalumno}/subjects`);

  }else{
    req = axios.get(`${SERVER}/subjects`);
  }
  return {
    type: GET_MATERIAS,
    payload: req
  };
}

export function getProfesores(){
  let req = axios.get(`${SERVER}/professors`);
  return {
    type: PROFESORES_REQ,
    payload: req
  };
}

export function getNotas(idalumno){
  return {
    type: GET_NOTAS,
    payload: [
      {
        "id": 1,
        "noteType": "PP",
        "takenDate": "2017-05-10",
        "score": 4,
        "percentage": 85,
        "opportunity": 1,
        "taken": {
          "subject_id": 1
        }
      },
      {
        "id": 2,
        "noteType": "FINAL",
        "takenDate": "2018-06-15",
        "score": 5,
        "percentage": 100,
        "opportunity": 1,
        "taken": {
          "subject_id": 1
        }
      },
      {
        "id": 3,
        "noteType": "FINAL",
        "takenDate": "2017-06-15",
        "score": 1,
        "percentage": 20,
        "opportunity": 1,
        "taken": {
          "subject_id": 2
        }
      },
      {
        "id": 4,
        "noteType": "FINAL",
        "takenDate": "2018-06-15",
        "score": 3,
        "percentage": 75,
        "opportunity": 1,
        "taken": {
          "subject_id": 1
        }
      }
    ]
  };
}

export function getExamenesPorAprobar(){
  let req = axios.get(`${SERVER}/examinations/uncheckeds`);
  return {
    type: GET_EXAMENES,
    payload: req
  };
}
export function getExamenes(){
  let req = axios.get(`${SERVER}/examinations`);
  return {
    type: GET_EXAMENES,
    payload: req
  };
}


function setSessionStorage(mantener){
  if(mantener===true){
    localStorage.setItem("session_token", "true");
    sessionStorage.removeItem("session_token");
  } else {
    sessionStorage.setItem("session_token", "true");
    localStorage.removeItem("session_token");
  }
}
