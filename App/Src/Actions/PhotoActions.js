export const incrementPhotoCount = () => {
  return {
      type: 'INCREMENT_PHOTO_COUNT'
    }
};

export const sendPhotoInit = () => {
  return {
    type: 'SEND_PHOTO_INIT'
  }
};

export const sendPhotoSuccess = () => {
  return {
    type: 'SEND_PHOTO_SUCCESS'
  }
};

export const sendPhotoFail = () => {
  return {
    type: 'SEND_PHOTO_FAIL',
    response: 'Error Sending Photo'
  }
};

export const sendPhoto = (data) => {
  return (dispatch) => {
    //Start loading animation
    dispatch(fetchUserInit());
    //Begin fetching
    return fetch('http://10.16.0.109:8080/api/dates', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(data => {
      data.json().then(data => {
        dispatch(fetchUserSuccess(data)));
        dispatch(sendPhotoSuccess());
      }
    })
    .catch(() => {
      dispatch(sendPhotoFail());
    });
  }
}
