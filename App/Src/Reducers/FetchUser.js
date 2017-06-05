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
    case ('ADD_FRIENDS'):
      let addFriends = state.userData.friends.concat(action.data);
      return Object.assign({}, state, {
        userData: {
          ...state.userData,
          friends: addFriends
        }
      });
    case ('DELETE_FRIEND'):
      let deleteFriends = state.userData.friends.filter(friend => {
        return friend !== action.data;
      });
      return Object.assign({}, state, {
        userData: {
          ...state.userData,
          friends: deleteFriends
        }
      });
    default:
      return state;
  }
};

export default user;
