export const setUser = (user) => {
  return {
    type: 'SET_USER',
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

export const updateAdherence = (percentage) => {
  return {
    type: 'UPDATE_ADHERENCE',
    percentage
  }
}
