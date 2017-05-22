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

export const fetchUser = () => {
  return (dispatch) => {
    //Start loading animation
    dispatch(fetchUserInit());
    //Begin fetching
    return fetch('http://10.16.0.80:8080/api/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(data => {
      data.json().then(data => dispatch(fetchUserSuccess(data)));
    })
    .catch(() => {
      dispatch(fetchUserFail());
    });
  }
}
