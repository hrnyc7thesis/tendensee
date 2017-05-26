const defaultState = {
  isLoggedIn: false,
  isFetching: false,
  username: '',
  password: '',
  email: '',
  route: 'SignUp',
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
    case ('LOGOUT'):
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: '',
        password: '',
        email: ''
      });
    case ('AUTH_INIT'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case ('AUTH_SUCCESS'):
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        // SHOULD SET USER DATA - CALL fetchUserSuccess???
      });
    case ('AUTH_FAIL'):
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

export default auth;