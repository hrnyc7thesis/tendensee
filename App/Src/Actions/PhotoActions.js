import * as UserActions from './UserActions';
import { MY_IP } from './../myip';

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
    dispatch(sendPhotoInit());
    return fetch(`http://${MY_IP}:8080/api/dates`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-custom-header": data.token
      },
      body: JSON.stringify(data)
    })
    .then(data => {
      return data.json().then(data => {
        dispatch(UserActions.fetchUserSuccess(data));
        dispatch(sendPhotoSuccess());
        dispatch(showGotPhotoModal());
      });
    })
    .catch(() => {
      dispatch(sendPhotoFail());
    });
  }
};

export const showPhotoCalculatingModal = () => {
  return {
    type: 'SHOW_PHOTO_CALCULATING_MODAL'
  }
};

export const hidePhotoCalculatingModal = () => {
  return {
    type: 'HIDE_PHOTO_CALCULATING_MODAL'
  }
};

export const showPhotoCalculatingWithTimeout = () => {
  return (dispatch) => {
    dispatch(showPhotoCalculatingModal());
    setTimeout(() => {
      dispatch(hidePhotoCalculatingModal());
    }, 3000);
  };
};

export const showGotPhotoModal = () => {
  return {
    type: 'SHOW_GOT_PHOTO_MODAL'
  }
};

export const hideGotPhotoModal = () => {
  return {
    type: 'HIDE_GOT_PHOTO_MODAL'
  }
};
