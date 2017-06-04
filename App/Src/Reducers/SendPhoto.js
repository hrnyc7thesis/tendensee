const sendPhotos = (state = {
  photoCount: 0,
  showPhotoCalculatingModal: false,
  showGotPhotoModal: false,
  sendingPhoto: false,
  currentPhoto: {}
}, action) => {
  switch (action.type) {
    case ('INCREMENT_PHOTO_COUNT'):
      return Object.assign({}, state, {photoCount: state.photoCount + 1});
    case ('SHOW_PHOTO_CALCULATING_MODAL'):
      return Object.assign({}, state, {showPhotoCalculatingModal: true});
    case ('HIDE_PHOTO_CALCULATING_MODAL'):
      return Object.assign({}, state, {showPhotoCalculatingModal: false});
    case ('SHOW_GOT_PHOTO_MODAL'):
      return Object.assign({}, state, {showGotPhotoModal: true});
    case ('HIDE_GOT_PHOTO_MODAL'):
      return Object.assign({}, state, {showGotPhotoModal: false});
    case ('SEND_PHOTO_INIT'):
      return Object.assign({}, state, {sendingPhoto: true});
    case ('SEND_PHOTO_FAIL'):
      return Object.assign({}, state, {sendingPhoto: false});
    case ('SEND_PHOTO_SUCCESS'):
      return Object.assign({}, state, {
        sendingPhoto: false,
        currentPhoto: action.response.currentDate
      });
    default:
      return state;
  }
};

export default sendPhotos;
