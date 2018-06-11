export const setPrescriptions = (prescriptions) => {
  return {
    type: 'SET_PRESCRIPTIONS',
    prescriptions
  }
}

export const addPrescription = (prescription) => {
  return {
    type: 'ADD_PRESCRIPTION',
    prescription
  }
}
