//const SERVER = "http://127.0.0.1:3000/api/";

export const LOGIN_REQ = "LOGIN_REQ";
export const GET_NOTAS = "GET_NOTAS";
export const GET_MATERIAS = "GET_MATERIAS";
export const GET_NOTAS_POR_APROBAR = "GET_NOTAS_POR_APROBAR";
export const GET_MATERIAS_CURSANDOSE = "GET_MATERIAS_CURSANDOSE";
export const GET_MATERIAS_A_CARGO = "GET_MATERIAS_A_CARGO";
export const GET_ALUMNOS_PARA_CARGA = "GET_ALUMNOS_PARA_CARGA";

export function loguear(usuario, contrasenha){
  return {
    type: LOGIN_REQ,
    payload: {}
  };
}

export function enviarAprobados(notes){
  console.log(notes);
}

export function getAlumnosParaCarga(idusuario){
  return {
    type: GET_ALUMNOS_PARA_CARGA,
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
  return {
    type: GET_MATERIAS_CURSANDOSE,
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

export function getMaterias(idalumno){
  return {
    type: GET_MATERIAS,
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

export function getNotasPorAprobar(){
  return {
    type: GET_NOTAS_POR_APROBAR,
    payload:[
      {
        takenDate: "2018-05-11",
        subject: {
          id: 1,
          name: "Física I"
        },
        notes: [
          {
            id: 1,
            noteType: "FINAL",
            score: 4,
            percentage: 85,
            opportunity: 1,
            student: {
              id: 1,
              person: {
                names: "Martín Tamay",
                ci: "4315943"
              }
            }
          },
          {
            id: 2,
            noteType: "FINAL",
            score: 4,
            percentage: 85,
            opportunity: 2,
            student: {
              id: 2,
              person: {
                names: "Frijolito",
                ci: "5486578"
              }
            }
          }
        ]
      },
      {
        takenDate: "2018-05-11",
        subject: {
          id: 2,
          name: "Análisis I"
        },
        notes: [
          {
            id: 1,
            noteType: "FINAL",
            score: 4,
            percentage: 85,
            opportunity: 1,
            student: {
              id: 1,
              person: {
                names: "Martín Tamay",
                ci: "4315943"
              }
            }
          },
          {
            id: 2,
            noteType: "FINAL",
            score: 4,
            percentage: 85,
            opportunity: 2,
            student: {
              id: 2,
              person: {
                names: "Frijolito",
                ci: "5486578"
              }
            }
          }
        ]
      }
    ]
  };
}
