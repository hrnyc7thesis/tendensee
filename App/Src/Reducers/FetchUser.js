const user = (state = {
  isFetching: false,
  userData: {},
}, action) => {
  switch (action.type) {
    case ('FETCH_USER_INIT'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case ('FETCH_USER_SUCCESS'):
      return Object.assign({}, state, {
        isFetching: false,
        userData: action.response
      });
    case ('FETCH_USER_FAIL'):
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
};

export default user;
