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

export const deletePrescription = (prescriptionId, day) => {
  return {
    type: 'DELETE_PRESCRIPTION',
    prescriptionId, day
  }
}

export const editPrescription = (prescription, day) => {
  return {
    type: 'EDIT_PRESCRIPTION',
    prescription, day
  }
}

export const addDose = (times, prescriptionId, day) => {
  return {
    type: 'ADD_DOSE',
    times, prescriptionId, day
  }
}
