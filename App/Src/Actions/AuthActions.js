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

export const auth = (username, password, email, route) => {
  return dispatch => {

    console.log('un, pass, email, route', username, password, email, route);

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
        route === 'Login' ? Actions.camera() : Actions.habits();
      })
    })
    .catch(err => dispatch(authFail(err)));
  }
}
