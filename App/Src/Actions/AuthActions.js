import { MY_IP } from './../myip';
import { fetchUserSuccess } from './UserActions.js'
import { Actions } from 'react-native-router-flux';

export const authInit = () => {
  return {
    type: 'AUTH_INIT'
  }
};

export const authSuccess = (data) => {
  return {
    type: 'AUTH_SUCCESS',
    response: data
  }
};

export const authFail = (err) => {
  return {
    type: 'AUTH_FAIL',
    response: err
  }
};

export const checkAuthInit = () => {
  return {
    type: 'CHECK_AUTH_INIT'
  }
};

export const checkAuthSuccess = (bool) => {
  return {
    type: 'CHECK_AUTH_SUCCESS',
    response: bool
  }
};

export const checkAuthFail = (bool) => {
  return {
    type: 'CHECK_AUTH_FAIL',
    response: bool
  }
};



export const checkAuth = (token) => {
  return dispatch => {
    return fetch(`http://${MY_IP}:8080/api/signedin`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-custom-header": token
      },
    })
    .then(bool => {
      console.log('bool in checkauth', bool)
      console.log('checkauth action boolean?', bool);
      bool ? Actions.camera() : Actions.auth;
      bool ? dispatch(checkAuthSuccess(bool)) : dispatch(checkAuthFail(data))
    })
  }
}

export const auth = (username, password, email, route) => {
  return dispatch => {

    dispatch(authInit());

    const user = {
      username,
      password,
      email
    }

    const path = route === 'Login' ? 'login' : 'register'; // can add to end of path instead of users...

    return fetch(`http://${MY_IP}:8080/api/` + path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(data => {
      return data.json()
      .then(data => {
        console.log('data in authact:', data);
        dispatch(authSuccess())
        dispatch(fetchUserSuccess(data))
        route === 'Login' && data.habits.length ? Actions.camera() : Actions.habits();
      })
    })
    .catch(err => dispatch(authFail(err)));
  }
}
