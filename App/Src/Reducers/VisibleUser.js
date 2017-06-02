const user = (state = {
  isFetching: false,
  visibleUserData: {},
}, action) => {
  switch (action.type) {
    case ('GET_VISIBLE_USER_INIT'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case ('GET_VISIBLE_USER_SUCCESS'):
      return Object.assign({}, state, {
        isFetching: false,
        visibleUserData: action.response
      });
    case ('GET_VISIBLE_USER_FAIL'):
      return Object.assign({}, state, {
        isFetching: false
      });
    case ('ADD_FRIENDS'):
      let addFriends = state.visibleUserData.friends.concat(action.data);
      return Object.assign({}, state, {
        visibleUserData: {
          ...state.visibleUserData,
          friends: addFriends
        }
      });
    case ('DELETE_FRIEND'):
      let deleteFriends = state.visibleUserData.friends.filter(friend => {
        return friend !== action.data;
      });
      return Object.assign({}, state, {
        visibleUserData: {
          ...state.visibleUserData,
          friends: deleteFriends
        }
      });
    default:
      return state;
  }
};

export default user;
