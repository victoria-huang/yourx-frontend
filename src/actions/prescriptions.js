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

export const setAllPrescriptions = (prescriptions) => {
  return {
    type: 'SET_ALL_PRESCRIPTIONS',
    prescriptions
  }
}
