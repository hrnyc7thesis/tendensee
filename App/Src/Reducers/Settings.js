const settings = (state ={
  updatingPhoto:false,
  updatingEmail: false,
  updatingNotification: false,
  updatingPrivate: false
}, action) => {
  switch(action.type){
    case('UPDATE_PROFILE_PHOTO_INIT'):
      return Object.assign({}, state, {
        updatingPhoto: true
      });
    case('UPDATE_PROFILE_PHOTO_SUCCESS'):
      return Object.assign({}, state, {
        updatingPhoto: false
      });
    case('UPDATE_PROFILE_PHOTO_FAIL'):
      return Object.assign({}, state, {
        updatingPhoto: false
      });

    case('UPDATE_EMAIL_INIT'):
      return Object.assign({}, state, {
        updatingEmail: true
      });
    case('UPDATE_EMAIL_SUCCESS'):
      return Object.assign({}, state, {
        updatingEmail: false
      });
    case('UPDATE_EMAIL_FAIL'):
      return Object.assign({}, state, {
        updatingEmail: false
      });

    case('UPDATE_NOTIFICATION_INIT'):
      return Object.assign({}, state, {
        updatingNotification: true
      });
    case('UPDATE_NOTIFICATION_SUCCESS'):
      return Object.assign({}, state, {
        updatingNotification: false
      });
    case('UPDATE_NOTIFICATION_FAIL'):
      return Object.assign({}, state, {
        updatingNotification: false
      });

    case('UPDATE_PRIVATE_INIT'):
      return Object.assign({}, state, {
        updatingPrivate: true
      });
    case('UPDATE_PRIVATE_SUCCESS'):
      return Object.assign({}, state, {
        updatingPrivate: false
      });
    case('UPDATE_PRIVATE_FAIL'):
      return Object.assign({}, state, {
        updatingPrivate: false
      });
    default:
      return state;
  }
};

export default settings;
