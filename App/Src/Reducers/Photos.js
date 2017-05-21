const photoCount = (state = 0, action) => {
  switch (action.type) {
    case ('INCREMENT_PHOTO_COUNT'):
      return state + 1;
    default:
      return state;
  }
};

export default photoCount;
