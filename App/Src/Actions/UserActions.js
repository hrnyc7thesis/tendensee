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

export const fetchUserFail = (err) => {
  return {
    type: 'FETCH_USER_FAIL',
    response: err
  }
};


const fetchWithToken = (dispatch, tokenArg) => {
  return fetch(`http://${MY_IP}:8080/api/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "x-custom-header": tokenArg
    }
  })
  .then(data => {
    data.json()
    .then(data => {
      AsyncStorage.setItem('user', JSON.stringify(data));
      data.token ? AsyncStorage.setItem('token', data.token) : '';
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

export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(fetchUserInit());
    if(token) {
      console.log('token', token);
      fetchWithToken(dispatch, token);
    } else {
      AsyncStorage.getItem('token')
      .then(asyncToken => {
        console.log('asyncToken', asyncToken);
        fetchWithToken(dispatch, asyncToken);
      })
    }
  }
}
