const friends = (state = {
  allUsers: [],
  friends: [],
}, action) => {
  switch (action.type) {
    case ('GET_FRIENDS_SUCCESS'):
      return Object.assign({}, state, {
        allUsers: action.data.allUsers,
        friends: action.data.friends
      });
    case ('ADD_FRIENDS'):
      return Object.assign({}, state, {
        friends: state.friends.concat(action.data)
      });
    case ('DELETE_FRIEND'):
      return Object.assign({}, state, {
        friends: state.friends.filter(friend => {
          console.log('friend',friend);
          console.log('action.data',action.data);
          return friend !== action.data;
        })
      });
    default:
      return state;
  }
};

export default friends;
