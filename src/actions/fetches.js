export const fetchPatientAdherence = (userId) => {
  return fetch(`http://localhost:3000/api/v1/patients/${userId}/daily_adherence`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
