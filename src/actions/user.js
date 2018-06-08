export const login = (user) => {
  return {
    type: 'LOGIN',
    user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const setAdherence = (percentage) => {
  return {
    type: 'SET_ADHERENCE',
    percentage
  }
}
