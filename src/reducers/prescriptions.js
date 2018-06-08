import uuid from 'uuid';

export default (state = [], action) => {
  switch (action.type) {
    case 'SET_PRESCRIPTIONS':
      return action.prescriptions;
    case 'ADD_PRESCRIPTION':
      const rx = {...action.prescription, id: uuid()};
      return state.concat(rx);
    default:
      return state;
  }
}
