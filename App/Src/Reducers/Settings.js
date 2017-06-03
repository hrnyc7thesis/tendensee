const settings = (state ={updatingEmail: false}, action) => {
  switch(action.type){
    case('UPDATE_EMAIL_INIT'):
      return Object.assign({}, state, {
        updatingEmail: true,
      });
    case('UPDATE_EMAIL_SUCCESS'):
      return Object.assign({}, state, {
        updatingEmail: false,
      });
    case('UPDATE_EMAIL_FAIL'):
      return Object.assign({}, state, {
        updatingEmail: false,
      });
    default:
      return state;
  }
};

export default settings;
