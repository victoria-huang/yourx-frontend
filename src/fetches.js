export const fetchPatientAdherence = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}/daily_adherence`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const fetchPatient = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const fetchPatientDailyMeds = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}/daily_meds`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }).then(r => r.json())
}

export const getUser = () => {
  return fetch(`http://localhost:3000/get_user`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }).then(r => r.json())
}
