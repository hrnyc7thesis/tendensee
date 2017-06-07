import { MY_IP } from './../myip';
import { fetchUserSuccess } from './UserActions.js'
import { Actions, ActionConst } from 'react-native-router-flux';
import { AsyncStorage, Alert } from 'react-native'


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

export const setLandingTimeout = (bool) => {
  return {
    type: 'LANDING_TIMEOUT',
    response: bool
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

export const landingTimeout = (token, route) => {
  return dispatch => {
    console.log('token & route in timeout', token, route)
    if(!token && route === 'Landing') {
      Actions.auth({type: ActionConst.RESET });
      dispatch(setLandingTimeout(true));
    }
  }
}

export const checkAuth = (token) => {
  console.log('in checkauth: token', token)
  return dispatch => {
    return fetch(`http://${MY_IP}:8080/signedin`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-custom-header": token
      },
    })
    .then(bool => {
      console.log('bool in checkauth', bool.ok)
      console.log('checkauth action boolean?', bool.ok);
      bool.ok ? Actions.camera({type: ActionConst.RESET}) : Actions.auth({type: ActionConst.RESET});
      bool.ok ? dispatch(checkAuthSuccess(bool.ok)) : dispatch(checkAuthFail(bool.ok))
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
    console.log(MY_IP)
    return fetch(`http://${MY_IP}:8080/` + path, {
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
        if(data.token) {
          AsyncStorage.setItem('token', data.token);
          AsyncStorage.setItem('user', JSON.stringify(data));
          console.log('data in authact:', data);
          dispatch(authSuccess())
          dispatch(fetchUserSuccess(data))
          route === 'Login' && data.habits.length ? Actions.camera({type: ActionConst.RESET}) : Actions.habits({type: ActionConst.RESET});
        }
        else {
          console.log(data);
          Alert.alert(data)
        }
      })
    })
    .catch(err => dispatch(authFail(err)));
  }
}
