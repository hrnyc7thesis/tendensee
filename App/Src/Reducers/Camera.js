cameraReducer = (state = { photoCount: 0 }, action) => {
  switch (action.type) {
    case ('INCREMENT_PHOTO_COUNT'):
      console.log('state (incrementingPhotoCount): ', state);
      return state;
    default:
      console.log('state (default): ',state);
      return state;
  }
};

export default cameraReducer;
