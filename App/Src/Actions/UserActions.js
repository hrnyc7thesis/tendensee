import { MY_IP } from './../myip';
import * as FriendActions from './FriendActions';

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

export const fetchUser = (token) => {
  return (dispatch) => {
    //Start loading animation
    dispatch(fetchUserInit());
    //Begin fetching
    console.log('fetching user');

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
      .then((data) => {
        dispatch(fetchUserSuccess(data));
        dispatch(FriendActions.getVisibleUserSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err));
      })
    })
    .catch((err) => {
      dispatch(fetchUserFail(err));
    });
  }
}
