import uuid from 'uuid';

export default (state = {
  all: [],
  today: [],
  mon: [],
  tues: [],
  wed: [],
  thurs: [],
  fri: [],
  sat: [],
  sun: []
}, action) => {
  switch (action.type) {
    case 'SET_DAILY_PRESCRIPTIONS':
      return { today: action.prescriptions };
    case 'ADD_PRESCRIPTION':
      const rx = {...action.prescription, id: uuid()};
      return state.concat(rx);
    default:
      return state;
  }
}
