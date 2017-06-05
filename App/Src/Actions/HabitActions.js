import { MY_IP } from './../myip';
import * as UserActions from './UserActions';
import { fetchUser, fetchUserSuccess } from './UserActions.js'


export const habitInit = () => {
  return {
    type: 'HABIT_INIT'
  }
};

export const habitSuccess = (data) => {
  return {
    type: 'HABIT_SUCCESS',
    response: data
  }
};

export const habitFail = (err) => {
  return {
    type: 'HABIT_FAIL',
    response: err
  }
};

export const updateHabitInit = () => {
  return {
    type: 'UPDATE_HABIT_INIT'
  }
};

export const updateHabitSuccess = (data) => {
  return {
    type: 'UPDATE_HABIT_SUCCESS',
    response: data
  }
};

export const updateHabitFail = (err) => {
  return {
    type: 'UPDATE_HABIT_FAIL',
    response: err
  }
};

export const updateHabit = (userData, habit) => {
  return dispatch => {
    dispatch (updateHabitInit());
    console.log('in update habit, ud then habit:', userData, habit)
    let postData = Object.assign({}, userData, {data: habit}); // WILL EVENTUALLY HAVE A HABIT TYPE!!!

    return fetch(`http://${MY_IP}:8080/api/habits`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-custom-header": userData.token
      },
      body: JSON.stringify(postData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(habitSuccess(data));
        dispatch(fetchUser(userData.token))
      })
    })
    .catch((err)=> dispatch(habitFail(err)));
  }
}

export const addHabit = (userData, habit) => {
  return dispatch => {
    dispatch (habitInit());
    console.log('in add habit, ud then habit:', userData, habit)
    let postData = Object.assign({}, userData, {data: habit}); // WILL EVENTUALLY HAVE A HABIT TYPE!!!

    return fetch(`http://${MY_IP}:8080/api/habits`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "x-custom-header": userData.token
      },
      body: JSON.stringify(postData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(habitSuccess(data));
        dispatch(fetchUserSuccess(data));
      })
    })
    .catch((err)=> dispatch(habitFail(err)));
  }
}
