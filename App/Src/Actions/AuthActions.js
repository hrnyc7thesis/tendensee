export const login = (username, password) => {
  return {
    type: 'LOGIN',
    username, 
    password
  }
}

export const signupInit = () => {
  return {
    type: 'SIGNUP_INIT'
  }
};

export const signupSuccess = (data) => {
  return {
    type: 'SIGNUP_SUCCESS',
    response: data
  }
};

export const signupFail = () => {
  return {
    type: 'SIGNUP_FAIL',
    response: 'Error Signing Up New User'
  }
};

export const signup = (username, password, email) => {
  return dispatch => {

    dispatch(signupInit());

    const user = {
      username,
      password, 
      email
    }

    return fetch('http://10.16.0.109:8080/api/users', {
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
        dispatch(signupSuccess(data))
      })
    })
    .catch(() => dispatch(signupFail()));
  }
}