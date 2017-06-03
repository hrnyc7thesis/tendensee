import * as UserActions from './UserActions';
import { MY_IP } from './../myip';
import { fetchUser, fetchUserSuccess } from './UserActions';


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

export const sendPhotoSuccess = (data) => {
  return {
    type: 'SEND_PHOTO_SUCCESS',
    response: data
  }
};

export const sendPhotoFail = (err) => {
  return {
    type: 'SEND_PHOTO_FAIL',
    response: err
  }
};

export const sendPhoto = (data, day, habit) => {
  return (dispatch) => {
    dispatch(sendPhotoInit());

    console.log('photo action day habit', day, habit);

    let sendData = data;
    sendData.day = day;
    sendData.picHabit = habit;


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

        dispatch(fetchUser());
        dispatch(sendPhotoSuccess(data));
        dispatch(showGotPhotoModal());
      });
    })
    .catch(err => {
      dispatch(sendPhotoFail(err));
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
