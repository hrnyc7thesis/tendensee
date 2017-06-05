const day = (state ={updatingDay: false, deletingDay: false}, action) => {
  switch (action.type) {
    case ('UPDATE_DAY_INIT'):
      return Object.assign({}, state, {
        updatingDay: true,
      });
    case ('UPDATE_DAY_SUCCESS'):
      return Object.assign({}, state, {
        updatingDay: false,
      });
    case ('UPDATE_DAY_FAIL'):
      return Object.assign({}, state, {
        updatingDay: false,
      });
    case ('DELETE_DAY_INIT'):
      return Object.assign({}, state, {
        deletingDay: true,
      });
    case ('DELETE_DAY_SUCCESS'):
      return Object.assign({}, state, {
        deletingDay: false,
      });
    case ('DELETE_DAY_FAIL'):
      return Object.assign({}, state, {
        deletingDay: false,
      });
    default:
      return state;
  }
};

export default day;
