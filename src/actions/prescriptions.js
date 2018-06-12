export const setDailyPrescriptions = (prescriptions) => {
  return {
    type: 'SET_DAILY_PRESCRIPTIONS',
    prescriptions
  }
}

export const setAllPrescriptions = (prescriptions) => {
  return {
    type: 'SET_ALL_PRESCRIPTIONS',
    prescriptions
  }
}

export const addPrescription = (prescription) => {
  return {
    type: 'ADD_PRESCRIPTION',
    prescription
  }
}

//to do

export const editPrescription = (prescriptionId) => {
  return {
    type: 'EDIT_PRESCRIPTION',
    prescriptionId
  }
}

export const takePrescription = (rxTakeTimeId) => {
  return {
    type: 'TAKE_PRESCRIPTION',
    rxTakeTimeId
  }
}

export const untakePrescription = (rxTakeTimeId) => {
  return {
    type: 'UNTAKE_PRESCRIPTION',
    rxTakeTimeId
  }
}

export const deletePrescription = (prescriptionId) => {
  return {
    type: 'DELETE_PRESCRIPTION',
    prescriptionId
  }
}

export const deleteDose = (rxTakeTimeId) => {
  return {
    type: 'DELETE_DOSE',
    rxTakeTimeId
  }
}
