const defaultState = {
  isLoggedIn: false,
  isFetching: false,
  username: '',
  password: '',
  email: ''
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
    case ('LOGIN'):
      return Object.assign({}, state, {
        isLoggedIn: true,
        username: action.username,
        password: action.password,
        email: action.email
      });
    case ('LOGOUT'):
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: '',
        password: '',
        email: ''
      });
    case ('SIGNUP_INIT'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case ('SIGNUP_SUCCESS'):
      return Object.assign({}, state, {
        isFetching: false,
        userData: action.response
      });
    case ('SIGNUP_FAIL'):
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

export default auth;