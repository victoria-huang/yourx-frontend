export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      // localStorage.setItem('username', action.user.username);
      // localStorage.setItem('user_id', action.user.userId);
      // localStorage.setItem('user_class', action.user.userClass);
      // localStorage.setItem('token', action.user.token);
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
