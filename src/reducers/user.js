export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      // localStorage.setItem('username', action.user.username);
      // localStorage.setItem('user_id', action.user.userId);
      // localStorage.setItem('user_class', action.user.userClass);
      // localStorage.setItem('token', action.user.token);
      return {...action.user, adherence: 0};
    case 'LOGOUT':
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_class');
      localStorage.removeItem('token');
      return {};
    case 'SET_ADHERENCE':
      return {...state, adherence: action.percentage}
    default:
      return state;
  }
}
