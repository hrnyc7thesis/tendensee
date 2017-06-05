import { MY_IP } from './../myip';
import * as UserActions from './UserActions';

export const addFriends = (friends) => {
  return {
    type: 'ADD_FRIENDS',
    data: friends
  }
};

export const deleteFriend = (friend) => {
  return {
    type: 'DELETE_FRIEND',
    data: friend
  }
};

export const updateFriendsDatabaseSuccess = () => {
  return {
    type: 'UPDATE_FRIENDS_SUCCESS'
  }
};

export const updateFriendsDatabaseFail = (err) => {
  return {
    type: 'FRIENDS_FAIL',
    data: err
  }
};

export const addFriendsAndUpdate = (user, friends) => {
  return dispatch => {
    dispatch (addFriends(friends));
    let postData = Object.assign({}, {data: friends});
    return fetch(`http://${MY_IP}:8080/api/friends`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-custom-header': user.token
      },
      body: JSON.stringify(postData)
    })
    .then(() => {
      dispatch(updateFriendsDatabaseSuccess());
    })
    .catch((err) => {
      dispatch(updateFriendsDatabaseFail(err))
    });
  }
}

export const deleteFriendAndUpdate = (user, friend) => {
  return dispatch => {
    dispatch (deleteFriend(friend));
    let postData = Object.assign({}, {data: friend});
    return fetch(`http://${MY_IP}:8080/api/friends`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-custom-header': user.token
      },
      body: JSON.stringify(postData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(updateFriendsDatabaseSuccess(data));
      })
    })
    .catch((err)=> dispatch(updateFriendsDatabaseFail(err)));
  }
}


export const getVisibleUserInit = () => {
  return {
    type: 'GET_VISIBLE_USER_INIT'
  }
};

export const getVisibleUserSuccess = (data) => {
  return {
    type: 'GET_VISIBLE_USER_SUCCESS',
    response: data
  }
};

export const getVisibleUserFail = (err) => {
  return {
    type: 'GET_VISIBLE_USER_FAIL',
    data: err
  }
};

export const getVisibleUser = (user, clickedUserId) => {
  if (!clickedUserId) {
    return dispatch => {
      dispatch (getVisibleUserSuccess(user));
    }
  }
  return dispatch => {
    dispatch (getVisibleUserInit());
    return fetch(`http://${MY_IP}:8080/api/users/${clickedUserId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-custom-header": user.token
      }
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(getVisibleUserSuccess(data));
      })
    })
    .catch(err => {
      dispatch(getVisibleUserFail(err));
    });
  }
}
