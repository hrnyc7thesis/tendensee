  import { MY_IP } from './../myip';
  import { fetchUser } from './UserActions.js'


//NEXT THREE ARE FOR UPDATING PROFILE PHOTO

export const updateProfilePhotoInit = () => {
  return {
    type: 'UPDATE_PROFILE_PHOTO_INIT'
  }
};

export const updateProfilePhotoSuccess = (data) => {
  return {
    type: 'UPDATE_PROFILE_PHOTO_SUCCESS',
    response: data
  }
};

export const updateProfilePhotoFail = (err) => {
  return {
    type: 'UPDATE_PROFILE_PHOTO_FAIL',
    response: err
  }
};

//NEXT THREE ARE FOR UPDATING EMAIL
export const updateUserEmailInit = () => {
  return {
    type: 'UPDATE_EMAIL_INIT'
  }
};

export const updateUserEmailSuccess = (data) => {
  return {
    type: 'UPDATE_EMAIL_SUCCESS',
    response: data
  }
};

export const updateUserEmailFail = (err) => {
  return {
    type: 'UPDATE_EMAIL_FAIL',
    response: err
  }
};

//NEXT THREE ARE FOR TO SET Notifications

export const handleNotificationInit = () => {
  return {
    type: 'UPDATE_NOTIFICATION_INIT'
  }
};

export const handleNotificationSuccess = (data) => {
  return {
    type: 'UPDATE_NOTIFICATION_SUCCESS',
    response: data
  }
};

export const handleNotificationFail = (err) => {
  return {
    type: 'UPDATE_NOTIFICATION_FAIL',
    response: err
  }
};


//NEXT THREE ARE FOR TO SET PRIVATE

export const handlePrivateInit = () => {
  return {
    type: 'UPDATE_PRIVATE_INIT'
  }
};

export const handlePrivateSuccess = (data) => {
  return {
    type: 'UPDATE_PRIVATE_SUCCESS',
    response: data
  }
};

export const handlePrivateFail = (err) => {
  return {
    type: 'UPDATE_PRIVATE_FAIL',
    response: err
  }
};

export const updatePhoto = (imageData, userData, habit) => {
  return dispatch => {
    dispatch(updateProfilePhotoInit());
    let putData = Object.assign({}, {data: {photo: imageData}, user: userData, habits: habit});
    return fetch(`http://${MY_IP}:8080/api/users/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // "x-custom-header": data
      },
      body: JSON.stringify(putData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(updateProfilePhotoSuccess(data));
        dispatch(fetchUser());
      })
    })
    .catch(err => {
      dispatch(updateProfilePhotoFail(err));
    })
  }
};

export const updateEmail = (newEmail, userData, habit) => {
  return dispatch => {
    dispatch(updateUserEmailInit());
    let putData = Object.assign({}, {data: {email: newEmail}, user: userData, habits: habit});
    return fetch(`http://${MY_IP}:8080/api/users/:${userData.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(updateUserEmailSuccess(data));
      })
    })
    .catch(err => {
      dispatch(updateUserEmailFail(err));

    })
  }
};

export const handleNotification = (status, userData, habit) => {
  var statusToBit = +status; //this converts a boolean into BIT integer
  return dispatch => {
    dispatch(handleNotificationInit());
    let putData = Object.assign({}, {data: {notifications: statusToBit}, user: userData, habits: habit});
    return fetch(`http://${MY_IP}:8080/api/users/:${userData.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(handleNotificationSuccess(data));
        dispatch(fetchUser());
      })
    })
    .catch(err =>{
      dispatch(handleNotificationFail(err));
    })
  }
};

export const handlePrivate = (status, userData, habit) => {
  var statusToBit = +status;//this converts a boolean into BIT integer
  return dispatch => {
    dispatch(handlePrivateInit());
    let putData = Object.assign({}, {data: {private: statusToBit}, user: userData, habits: habit});
    return fetch(`http://${MY_IP}:8080/api/users/:${userData.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(handlePrivateSuccess(data));
        dispatch(fetchUser());
      })
    })
    .then(err => {
      dispatch(handlePrivateFail(err));
    })
  }
};
