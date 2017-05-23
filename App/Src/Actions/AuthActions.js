// export const login = (username, password) => {
//   return {
//     type: 'LOGIN',
//     username, 
//     password
//   }
// }

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

export const authFail = () => {
  return {
    type: 'AUTH_FAIL',
    response: 'Error Signing Up New User'
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

    return fetch('http://10.16.0.80:8080/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(data => {
      data.json()
      .then(data => {
        dispatch(authSuccess(data))
      })
    })
    .catch(() => dispatch(authFail()));
  }
}