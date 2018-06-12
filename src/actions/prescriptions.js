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

export const takePrescription = (rxTakeTimeId, timesIdx) => {
  return {
    type: 'TAKE_PRESCRIPTION',
    rxTakeTimeId, timesIdx
  }
}

export const untakePrescription = (rxTakeTimeId, timesIdx) => {
  return {
    type: 'UNTAKE_PRESCRIPTION',
    rxTakeTimeId, timesIdx
  }
}

export const deleteDose = (rxTakeTimeId, timesIdx, day) => {
  return {
    type: 'DELETE_DOSE',
    rxTakeTimeId, timesIdx, day
  }
}

// to do

export const editPrescription = (prescriptionId) => {
  return {
    type: 'EDIT_PRESCRIPTION',
    prescriptionId
  }
}

export const deletePrescription = (prescriptionId) => {
  return {
    type: 'DELETE_PRESCRIPTION',
    prescriptionId
  }
}
