import axios from 'axios';

const SERVER = "https://fiuni-app.herokuapp.com/api";
//const SERVER = "http://localhost:3000/api";

export const ERRLOGIN = "ERRLOGIN";
export const LOGIN_REQ = "LOGIN_REQ";
export const RELOGIN_REQ = "RELOGIN_REQ";
export const GET_NOTAS = "GET_NOTAS";
export const MATERIAS_REQ = "MATERIAS_REQ";
export const GET_MATERIA = "GET_MATERIA";
export const UPDATE_MATERIA = "UPDATE_MATERIA";
export const GET_MATERIAS_CURSANDOSE = "GET_MATERIAS_CURSANDOSE";
export const GET_MATERIAS_A_CARGO = "GET_MATERIAS_A_CARGO";
export const GET_CARRERAS = "GET_CARRERAS";
export const GET_EXAMENES = "GET_EXAMENES";
export const CREATE_EXAMEN = "CREATE_EXAMEN";
export const UPDATE_EXAMEN = "UPDATE_EXAMEN";
export const GET_EXAMEN = "GET_EXAMEN";
export const GET_ESTUDIANTES_PARA_CARGA = "GET_ESTUDIANTES_PARA_CARGA";
export const ESTUDIANTE_REQ = "ESTUDIANTE_REQ";
export const CREATE_ESTUDIANTE = "CREATE_ESTUDIANTE";
export const UPDATE_ESTUDIANTE = "UPDATE_ESTUDIANTE";
export const NOTAS_MATERIAS = "NOTAS_MATERIAS";
export const NOTES_CHECK = "NOTES_CHECK";
export const CREATE_MATERIA = "CREATE_MATERIA";
export const RESET_MATERIA = "RESET_MATERIA";
export const PROFESORES_REQ = "PROFESORES_REQ";
export const PROFESOR_CREATE = "PROFESOR_CREATE";
export const PROFESOR_UPDATE = "PROFESOR_UPDATE";
export const GET_PROFESOR = "GET_PROFESOR";
export const RESET_PROFESOR = "RESET_PROFESOR";
export const ESTUDIANTES_REQ= "ESTUDIANTES_REQ";

export function getMaterias(idestudiante=null){
  let req = null;
  if(idestudiante){
    req = axios.get(`${SERVER}/students/${idestudiante}/subjects`);
  }else{
    req = axios.get(`${SERVER}/subjects`);
  }
  return {
    type: MATERIAS_REQ,
    payload: req
  };
}
export function getMateriasACargo(idprofesor){
  let req = axios.get(`${SERVER}/professors/${idprofesor}/subjects`);

  return {
    type: GET_MATERIAS_A_CARGO,
    payload: req
  }
  /*return {
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
  };*/
}
export function getMateria(idmateria){
  let req = axios.get(`${SERVER}/subjects/${idmateria}`);
  return {
    type: GET_MATERIA,
    payload: req
  };
}
export function resetMateria(){
  return {
    type: RESET_MATERIA,
    payload: {}
  };
}
export function createMateria(subject){
  let req = axios.post(`${SERVER}/subjects`, { subject });
  return {
    type: CREATE_MATERIA,
    payload: req
  };
}
export function updateMateria(subject){
  let req = axios.put(`${SERVER}/subjects/${subject.id}`, { subject });
  return {
    type: UPDATE_MATERIA,
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
export function notasMateria(idmateria, anho){
  let req;
  if(anho===undefined){
    req = axios.get(`${SERVER}/subjects/${idmateria}/notes`);
  } else {
    req = axios.get(`${SERVER}/subjects/${idmateria}/notes/taken/from-year/${anho}`);
  }
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

export function getEstudiante(idestudiante){
  let req = axios.get(`${SERVER}/students/${idestudiante}`);
  return {
    type: ESTUDIANTE_REQ,
    payload: req
  };
}
export function createEstudiante(student){
  let req = axios.post(`${SERVER}/students`,{ student });
  return {
    type: CREATE_ESTUDIANTE,
    payload: req
  };
}
export function updateEstudiante(student){
  let req = axios.put(`${SERVER}/students/${student.id}`,{ student });
  return {
    type: UPDATE_ESTUDIANTE,
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
    type: GET_ESTUDIANTES_PARA_CARGA,
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


export function getMateriasCursandose(idestudiante){
  let req = axios.get(`${SERVER}/students/${idestudiante}/subjects`);

  return {
    type: GET_MATERIAS_CURSANDOSE,
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
export function getProfesor(id){
  let req = axios.get(`${SERVER}/professors/${id}`);
  return {
    type: GET_PROFESOR,
    payload: req
  };
}
export function createProfesor(professor){
  let req = axios.post(`${SERVER}/professors`, { professor });
  return {
    type: PROFESOR_CREATE,
    payload: req
  };
}
export function updateProfesor(professor){
  let req = axios.put(`${SERVER}/professors/${professor.id}`, { professor });
  return {
    type: PROFESOR_UPDATE,
    payload: req
  };
}
export function resetProfesor(){
  return {
    type: RESET_PROFESOR,
    payload: {}
  };
}
export function getEstudiantes(){
  let req = axios.get(`${SERVER}/students`);
  return{
      type: ESTUDIANTES_REQ,
      payload: req
  };
}

export function getNotas(idestudiante){
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
export function getExamenes(idmateria = null){
  let req;
  if(idmateria !== null){
    req = axios.get(`${SERVER}/subjects/${idmateria}/examinations`);
  }else {
    req = axios.get(`${SERVER}/examinations`);
  }
  return {
    type: GET_EXAMENES,
    payload: req
  };
}
export function getExamen(idexamen){
  let req = axios.get(`${SERVER}/examinations/${idexamen}`);
  return {
    type: GET_EXAMEN,
    payload: req
  };
}
export function createExamen(examination){
  let req = axios.post(`${SERVER}/examinations`, { examination });
  return {
    type: CREATE_EXAMEN,
    payload: req
  };
}
export function updateExamen(examination){
  let req = axios.put(`${SERVER}/examinations/${examination.id}`, { examination });
  return {
    type: UPDATE_EXAMEN,
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
