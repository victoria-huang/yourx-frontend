export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'LOGOUT':
      localStorage.clear();
      return {};
    case 'SET_ADHERENCE':
      return {...state, adherence: action.percentage}
    case 'UPDATE_ADHERENCE':
      return {...state, adherence: action.percentage}
    default:
      return state;
  }
}
