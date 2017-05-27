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
    // case ('LOGOUT'):
    //   return Object.assign({}, state, {
    //     isLoggedIn: false,
    //     username: '',
    //     password: '',
    //     email: ''
    //   });
    case ('AUTH_INIT'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case ('AUTH_SUCCESS'):
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
      });
    case ('AUTH_FAIL'):
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
      });
    case ('CHECK_AUTH_INIT'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case ('CHECK_AUTH_SUCCESS'):
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: action.response,
      });
    case ('CHECK_AUTH_FAIL'):
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: action.response
      });
    default:
      return state;
  }
}

export default auth;