const photo = (state = {
  photoCount: 0,
  showPhotoCalculatingModal: false
}, action) => {
  switch (action.type) {
    case ('INCREMENT_PHOTO_COUNT'):
      return Object.assign({}, state, {photoCount: state.photoCount + 1});
    case ('SHOW_PHOTO_CALCULATING_MODAL'):
      return Object.assign({}, state, {showPhotoCalculatingModal: true});
    case ('HIDE_PHOTO_CALCULATING_MODAL'):
      return Object.assign({}, state, {showPhotoCalculatingModal: false});
    default:
      return state;
  }
};

export default photo;
