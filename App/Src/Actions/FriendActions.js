import { MY_IP } from './../myip';
import * as UserActions from './UserActions';
import { fetchUserSuccess } from './UserActions.js'

export const getFriendsInit = () => {
  return {
    type: 'GET_FRIENDS_INIT'
  }
};

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

export const getFriendsSuccess = (data) => {
  return {
    type: 'GET_FRIENDS_SUCCESS',
    data: data
  }
};

export const getFriendsFail = (err) => {
  return {
    type: 'GET_FRIENDS_FAIL',
    data: err
  }
}

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

export const getFriends = (user) => {
  return dispatch => {
    dispatch (getFriendsInit());
    return fetch(`http://${MY_IP}:8080/api/friends`, {
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
        console.log('data',data);
        dispatch(getFriendsSuccess(data));
      })
    })
    .catch(err => {
      dispatch(getFriendsFail(err));
    });
  }
}

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
      dispatch(updateFriendsDatabaseSuccess())
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
