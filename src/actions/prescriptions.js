export const setDailyPrescriptions = (prescriptions) => {
  return {
    type: 'SET_DAILY_PRESCRIPTIONS',
    prescriptions
  }
}

export const addPrescription = (prescription) => {
  return {
    type: 'ADD_PRESCRIPTION',
    prescription
  }
}
