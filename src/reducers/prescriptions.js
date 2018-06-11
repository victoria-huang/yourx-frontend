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
      return { ...state, today: action.prescriptions };
    case 'SET_ALL_PRESCRIPTIONS':
      const mondayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Monday" ).length > 0
      })

      const tuesdayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Tuesday" ).length > 0
      })

      const wednesdayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Wednesday" ).length > 0
      })

      const thursdayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Thursday" ).length > 0
      })

      const fridayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Friday" ).length > 0
      })

      const saturdayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Saturday" ).length > 0
      })

      const sundayRx = action.prescriptions.filter(p => {
        return p.take_times.filter(t => t.day === "Sunday" ).length > 0
      })

      return {
        ...state,
        all: action.prescriptions,
        mon: mondayRx,
        tues: tuesdayRx,
        wed: wednesdayRx,
        thurs: thursdayRx,
        fri: fridayRx,
        sat: saturdayRx,
        sun: sundayRx
      };
    case 'ADD_PRESCRIPTION':
      const rx = {...action.prescription, id: uuid()};
      return state.all.concat(rx);
    default:
      return state;
  }
}
