import { MY_IP } from './../myip';
import { AsyncStorage } from 'react-native'

export const fetchUserInit = () => {
  return {
    type: 'FETCH_USER_INIT'
  }
};

export const fetchUserSuccess = (data) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    response: data
  }
};

export const fetchUserFail = () => {
  return {
    type: 'FETCH_USER_FAIL',
    response: 'Error Fetching User'
  }
};

export const fetchUser = (token) => {
  return (dispatch) => {
    token || AsyncStorage.getItem('token')
    .then(asyncToken => {
      dispatch(fetchUserInit());
      //Begin fetching
      console.log('token', token);

      return fetch(`http://${MY_IP}:8080/api/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "x-custom-header": asyncToken
        }
      })
      .then(data => {
        data.json()
        .then(data => {
          AsyncStorage.setItem('token', data.token);
          dispatch(fetchUserSuccess(data))
        })
        .catch(() => {
          dispatch(fetchUserFail());
        })
      })
      .catch(() => {
        dispatch(fetchUserFail());
      });
    })
    if(token) {
      //Start loading animation
      dispatch(fetchUserInit());
      //Begin fetching
      console.log('token', token);

      return fetch(`http://${MY_IP}:8080/api/users`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "x-custom-header": token
        }
      })
      .then(data => {
        data.json()
        .then(data => {
          AsyncStorage.setItem('token', data.token);
          dispatch(fetchUserSuccess(data))
        })
        .catch(() => {
          dispatch(fetchUserFail());
        })
      })
      .catch(() => {
        dispatch(fetchUserFail());
      });
    }
  }
}
