const sendingPhoto = (state = false, action) => {
  switch (action.type) {
    case ('SEND_PHOTO_INIT'):
      return true;
    case ('SEND_PHOTO_FAIL'):
      return false;
    case ('SEND_PHOTO_SUCCESS'):
      return false;
    default:
      return state;
  }
};

export default sendingPhoto;
